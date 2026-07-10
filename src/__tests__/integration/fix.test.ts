import * as fs from 'node:fs';
import * as os from 'node:os';
import * as path from 'node:path';
import { afterAll, beforeAll, describe, expect, it, vi } from 'vitest';

const { mockRequest } = vi.hoisted(() => {
  const mockRequest = vi.fn();
  return { mockRequest };
});

vi.mock('@/lib/github/client', () => ({
  createOctokit: () => ({ request: mockRequest }),
}));

vi.mock('@/lib/vulns/osv', async (importOriginal) => {
  const original = await importOriginal<typeof import('@/lib/vulns/osv')>();
  return {
    ...original,
    fetchFixVersion: vi.fn().mockResolvedValue('4.17.21'),
  };
});

import { fix } from '@/lib/business/fix';

describe('fix integration', () => {
  let tmpDir: string;

  beforeAll(() => {
    tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'vigilops-fix-test-'));

    const fixturePkg = JSON.stringify(
      {
        name: 'fixture',
        version: '0.0.1',
        dependencies: { lodash: '4.17.15' },
      },
      null,
      2,
    );

    fs.writeFileSync(path.join(tmpDir, 'package.json'), fixturePkg);
    fs.writeFileSync(path.join(tmpDir, 'index.ts'), "import _ from 'lodash';\nexport default _;\n");

    const encodedPkg = Buffer.from(fixturePkg).toString('base64');

    let contentsCallCount = 0;

    mockRequest.mockImplementation((route: string) => {
      if (route === 'GET /repos/{owner}/{repo}') {
        return Promise.resolve({ data: { default_branch: 'main' } });
      }
      if (route === 'GET /repos/{owner}/{repo}/contents/{path}') {
        contentsCallCount += 1;
        if (contentsCallCount === 1) {
          // getFileSha call — only sha needed
          return Promise.resolve({ data: { sha: 'abc123', content: undefined } });
        }
        // second call in createGitHubPr — return full content
        return Promise.resolve({ data: { sha: 'abc123', content: encodedPkg } });
      }
      if (route === 'POST /repos/{owner}/{repo}/git/refs') {
        return Promise.resolve({ data: {} });
      }
      if (route === 'PUT /repos/{owner}/{repo}/contents/{path}') {
        return Promise.resolve({ data: { commit: { sha: 'def456' } } });
      }
      if (route === 'POST /repos/{owner}/{repo}/pulls') {
        return Promise.resolve({ data: { html_url: 'https://github.com/owner/repo/pull/1' } });
      }
      return Promise.resolve({ data: {} });
    });
  });

  afterAll(() => {
    fs.rmSync(tmpDir, { recursive: true });
  });

  it('creates PR with lodash bumped to safe version', async () => {
    await fix('fake-token', 'owner/repo', tmpDir);

    // Find the PUT call that committed the updated package.json
    const putCall = mockRequest.mock.calls.find(
      (args: unknown[]) => typeof args[0] === 'string' && args[0].startsWith('PUT'),
    ) as [string, { content: string }] | undefined;

    expect(putCall).toBeDefined();

    const params = putCall?.[1];
    expect(params).toBeDefined();

    const committed = JSON.parse(
      Buffer.from(params?.content ?? '', 'base64').toString('utf-8'),
    ) as { dependencies?: Record<string, string> };

    expect(committed.dependencies?.lodash).not.toBe('4.17.15');
    expect(committed.dependencies?.lodash).toBe('4.17.21');

    // Verify PR was opened
    const prCall = mockRequest.mock.calls.find(
      (args: unknown[]) => typeof args[0] === 'string' && (args[0] as string).includes('/pulls'),
    );
    expect(prCall).toBeDefined();
  });
});
