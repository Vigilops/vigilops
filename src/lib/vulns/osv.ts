import type { VulnSummary } from './scanner';

interface OsvVuln {
  id: string;
  summary?: string;
  details?: string;
  severity?: string;
  fixed?: string;
  affected?: Array<{
    package: { name: string; ecosystem: string };
    ranges?: Array<{ fixed: string }>;
  }>;
}

interface OsvResponse {
  vulns?: OsvVuln[];
}

export async function queryOsvByPackage(pkg: string): Promise<VulnSummary[]> {
  const url = 'https://api.osv.dev/v1/query';
  let lastError: Error | null = null;

  for (let attempt = 0; attempt < 2; attempt++) {
    try {
      const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ package: { name: pkg, ecosystem: 'npm' } }),
      });

      if (res.status === 429) {
        const retryAfter = res.headers.get('Retry-After');
        const waitMs = retryAfter ? parseInt(retryAfter, 10) * 1000 : 60_000;
        await sleep(waitMs);
        continue;
      }

      if (!res.ok) {
        throw new Error(`OSV API returned ${res.status} for package ${pkg}`);
      }

      const data = (await res.json()) as OsvResponse;
      const vulns = data.vulns ?? [];

      return vulns.map((v): VulnSummary => {
        let fixedVersion: string | undefined;
        if (v.affected) {
          for (const aff of v.affected) {
            if (aff.ranges) {
              for (const range of aff.ranges) {
                if (range.fixed) {
                  fixedVersion = range.fixed;
                  break;
                }
              }
            }
            if (fixedVersion) break;
          }
        }
        return {
          id: v.id,
          package: pkg,
          currentVersion: '',
          fixedVersion,
          severity: v.severity ?? undefined,
        };
      });
    } catch (err) {
      lastError = err instanceof Error ? err : new Error(String(err));
      if (attempt === 0) {
        const res = await fetch(url, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ package: { name: pkg, ecosystem: 'npm' } }),
        }).catch(() => null);
        if (res?.status === 429) {
          const retryAfter = res.headers.get('Retry-After');
          const waitMs = retryAfter ? parseInt(retryAfter, 10) * 1000 : 60_000;
          await sleep(waitMs);
        }
      }
    }
  }

  if (lastError) {
    throw new Error(`Failed to query OSV for package ${pkg}: ${lastError.message}`);
  }
  return [];
}

export async function fetchFixVersion(cveId: string): Promise<string | null> {
  const url = `https://api.osv.dev/v1/vulns/${cveId}`;

  let lastError: Error | null = null;

  for (let attempt = 0; attempt < 2; attempt++) {
    try {
      const res = await fetch(url);

      if (res.status === 404) {
        return null;
      }

      if (res.status === 429) {
        const retryAfter = res.headers.get('Retry-After');
        const waitMs = retryAfter ? parseInt(retryAfter, 10) * 1000 : 60_000;
        await sleep(waitMs);
      }

      if (!res.ok) {
        throw new Error(`OSV API returned ${res.status} for ${cveId}`);
      }

      const data = (await res.json()) as unknown as {
        affected?: Array<{
          ranges?: Array<{ type: string; events: Array<{ fixed?: string }> }>;
        }>;
      };
      for (const aff of data.affected ?? []) {
        for (const range of aff.ranges ?? []) {
          for (const event of range.events ?? []) {
            if (event.fixed) return event.fixed;
          }
        }
      }
      return null;
    } catch (err) {
      lastError = err instanceof Error ? err : new Error(String(err));
      if (attempt === 0) {
        const res = await fetch(url).catch(() => null);
        if (res?.status === 429) {
          const retryAfter = res.headers.get('Retry-After');
          const waitMs = retryAfter ? parseInt(retryAfter, 10) * 1000 : 60_000;
          await sleep(waitMs);
        }
      }
    }
  }

  throw lastError
    ? new Error(`Failed to fetch OSV record for ${cveId}: ${lastError.message}`)
    : new Error(`Failed to fetch OSV record for ${cveId}`);
}

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
