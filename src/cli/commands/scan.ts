import { readPackageJson } from '../../lib/vulns/package';
import { filterReachable } from '../../lib/vulns/reachability';
import type { VulnSummary } from '../../lib/vulns/scanner';
import { scan } from '../../lib/vulns/scanner';

export interface ScanOptions {
  path: string;
  all: boolean;
}

export async function scanHandler(args: ScanOptions): Promise<void> {
  const { path, all } = args;

  try {
    await readPackageJson(`${path}/package.json`);
  } catch {
    process.exit(1);
  }

  let vulns: VulnSummary[];
  try {
    vulns = await scan(path);
  } catch (_err) {
    process.exit(1);
  }

  const [reachable, notReachable] = await filterReachable(vulns, path);

  const toShow = all ? [...reachable, ...notReachable] : reachable;
  const hidden = notReachable.length;

  if (toShow.length === 0) {
    process.stdout.write('No vulnerable dependencies found.\n');
    return;
  }

  process.stdout.write(`${formatRows(toShow)}\n`);
  if (!all && hidden > 0) {
    process.stdout.write(
      `(${hidden} not-reachable vulnerability(s) hidden — re-run with --all to see them)\n`,
    );
  }
}

function formatRows(rows: VulnSummary[]): string {
  const headers = ['id', 'package', 'currentVersion', 'fixedVersion'];
  const widths = headers.map((h) => h.length);
  for (const row of rows) {
    for (const [i, h] of headers.entries()) {
      const v = row[h as keyof VulnSummary];
      widths[i] = Math.max(widths[i] ?? h.length, String(v ?? '').length);
    }
  }
  const formatRow = (cells: string[]): string =>
    cells.map((c, i) => c.padEnd(widths[i] ?? 0)).join('  ');
  const lines: string[] = [];
  lines.push(formatRow(headers));
  lines.push(widths.map((w) => '-'.repeat(w)).join('  '));
  for (const row of rows) {
    lines.push(
      formatRow(
        headers.map((h) => {
          const v = row[h as keyof VulnSummary];
          return v === undefined || v === null ? '' : String(v);
        }),
      ),
    );
  }
  return lines.join('\n');
}
