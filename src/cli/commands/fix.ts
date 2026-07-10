import { fix } from '../../lib/business/fix';

export async function fixHandler(args: {
  token: string;
  repo: string;
  path?: string;
  dryRun?: boolean;
}): Promise<void> {
  const { token, repo, path = '.', dryRun = false } = args;

  if (!token) {
    process.exit(1);
  }

  if (!repo) {
    process.exit(1);
  }

  try {
    await fix(token, repo, path, dryRun);
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);

    if (message.includes('401') || message.toLowerCase().includes('unauthorized')) {
      process.exit(1);
    }

    if (message.includes('404')) {
      process.exit(1);
    }
    process.exit(1);
  }
}
