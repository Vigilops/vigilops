import { createGitHubPr, type Update } from '../github/pr';
import { fetchFixVersion } from '../vulns/osv';
import { filterReachable } from '../vulns/reachability';
import { scan } from '../vulns/scanner';

export async function fix(
  token: string,
  repo: string,
  path: string,
  dryRun?: boolean,
): Promise<void> {
  const scanned = await scan(path);
  const [reachable, notReachable] = await filterReachable(scanned, path);

  const updates: Update[] = [];

  void notReachable;
  for (const vuln of reachable) {
    const fixedVersion = await fetchFixVersion(vuln.id);
    if (!fixedVersion) continue;

    updates.push({
      depName: vuln.package,
      currentVersion: vuln.currentVersion,
      newVersion: fixedVersion,
      cveId: vuln.id,
      reason: `Reachable vulnerable dependency found. ${vuln.id} is fixed in ${fixedVersion}.`,
    });
  }

  if (updates.length === 0) {
    return;
  }

  if (dryRun) {
    for (const _u of updates) {
    }
    return;
  }

  const _prUrl = await createGitHubPr(token, repo, updates);
}
