import { readdir, readFile, stat } from 'node:fs/promises';
import { join } from 'node:path';
import type { VulnSummary } from './scanner';

const EXCLUDED_DIRS = new Set([
  'node_modules',
  '.git',
  '.next',
  'dist',
  'build',
  '.cache',
  '__pycache__',
  '.turbo',
]);

function isExcludedDir(name: string): boolean {
  return EXCLUDED_DIRS.has(name);
}

const SOURCE_EXTENSIONS = new Set(['ts', 'tsx', 'js', 'jsx', 'mjs', 'cjs']);

function isSourceFile(name: string): boolean {
  const ext = name.slice(name.lastIndexOf('.') + 1);
  return SOURCE_EXTENSIONS.has(ext);
}

export async function walkDir(dir: string): Promise<string[]> {
  const files: string[] = [];

  async function walk(currentDir: string): Promise<void> {
    let entries: string[];
    try {
      entries = await readdir(currentDir);
    } catch {
      return;
    }
    for (const entry of entries) {
      if (isExcludedDir(entry)) continue;
      const fullPath = join(currentDir, entry);
      let entryStat: Awaited<ReturnType<typeof stat>>;
      try {
        entryStat = await stat(fullPath);
      } catch {
        continue;
      }
      if (entryStat.isDirectory()) {
        await walk(fullPath);
      } else if (entryStat.isFile() && isSourceFile(entry)) {
        files.push(fullPath);
      }
    }
  }

  await walk(dir);
  return files;
}

export function parseImports(content: string): string[] {
  const packages = new Set<string>();

  let match: RegExpExecArray | null = null;
  const importRegex = /import\b[^;]*?from\s+['"]([^'"]+)['"]/g;
  match = importRegex.exec(content);
  while (match !== null) {
    if (match[1]) {
      const pkg = normalizePackageName(match[1]);
      if (pkg) packages.add(pkg);
    }
    match = importRegex.exec(content);
  }

  const requireRegex = /require\b[\s\S]*?['"]([^'"]+)['"]/g;
  match = requireRegex.exec(content);
  while (match !== null) {
    if (match[1]) {
      const pkg = normalizePackageName(match[1]);
      if (pkg) packages.add(pkg);
    }
    match = requireRegex.exec(content);
  }

  return Array.from(packages);
}

function normalizePackageName(name: string): string | null {
  if (name.startsWith('.') || name.startsWith('/')) return null;
  if (name.startsWith('@')) {
    const parts = name.split('/');
    if (parts.length >= 2) return `${parts[0]}/${parts[1]}`;
    return null;
  }
  const firstSlash = name.indexOf('/');
  return firstSlash > 0 ? name.slice(0, firstSlash) : name;
}

interface ImportGraph {
  direct: Set<string>;
}

export async function buildImportGraph(files: string[]): Promise<ImportGraph> {
  const direct = new Set<string>();

  for (const file of files) {
    let content: string;
    try {
      content = await readFile(file, 'utf-8');
    } catch {
      continue;
    }
    const imports = parseImports(content);
    for (const pkg of imports) {
      direct.add(pkg);
    }
  }

  return { direct };
}

export async function filterReachable(
  vulns: VulnSummary[],
  path: string,
): Promise<[VulnSummary[], VulnSummary[]]> {
  if (vulns.length === 0) return [[], []];

  const files = await walkDir(path);
  const graph = await buildImportGraph(files);

  const reachable: VulnSummary[] = [];
  const notReachable: VulnSummary[] = [];

  for (const vuln of vulns) {
    if (graph.direct.has(vuln.package)) {
      reachable.push(vuln);
    } else {
      notReachable.push(vuln);
    }
  }

  return [reachable, notReachable];
}
