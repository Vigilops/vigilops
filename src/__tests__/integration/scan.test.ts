import * as fs from 'node:fs';
import * as os from 'node:os';
import * as path from 'node:path';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import { filterReachable } from '@/lib/vulns/reachability';
import { scan } from '@/lib/vulns/scanner';

describe('scan + filterReachable integration', () => {
  let tmpDir: string;

  beforeAll(() => {
    tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'vigilops-scan-test-'));

    fs.writeFileSync(
      path.join(tmpDir, 'package.json'),
      JSON.stringify(
        {
          name: 'fixture',
          version: '0.0.1',
          dependencies: { lodash: '4.17.15' },
        },
        null,
        2,
      ),
    );

    fs.writeFileSync(path.join(tmpDir, 'index.ts'), "import _ from 'lodash';\nexport default _;\n");
  });

  afterAll(() => {
    fs.rmSync(tmpDir, { recursive: true });
  });

  it('scan detects lodash CVEs', async () => {
    const vulns = await scan(tmpDir);
    expect(vulns.length).toBeGreaterThan(0);
    expect(vulns.some((v) => v.package === 'lodash')).toBe(true);
  });

  it('filterReachable classifies lodash as reachable', async () => {
    const vulns = await scan(tmpDir);
    const [reachable, notReachable] = await filterReachable(vulns, tmpDir);
    expect(reachable.length).toBeGreaterThan(0);
    expect(reachable.every((v) => v.package === 'lodash')).toBe(true);
    expect(notReachable.length).toBe(0);
  });
});
