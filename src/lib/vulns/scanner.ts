import { queryOsvByPackage } from './osv';
import { readPackageJson } from './package';

export interface VulnSummary {
  id: string;
  package: string;
  currentVersion: string;
  fixedVersion?: string;
  severity?: string;
}

export async function scan(path: string): Promise<VulnSummary[]> {
  const pkg = await readPackageJson(`${path}/package.json`);
  const deps = { ...pkg.dependencies, ...pkg.devDependencies };
  if (Object.keys(deps).length === 0) return [];

  const results = await Promise.all(
    Object.entries(deps).map(([name, version]) =>
      queryOsvByPackage(name).then((vulns) =>
        vulns.map((v) => ({ ...v, currentVersion: version })),
      ),
    ),
  );

  return results.flat().filter((v): v is VulnSummary => v !== null);
}
