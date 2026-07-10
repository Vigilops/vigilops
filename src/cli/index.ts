#!/usr/bin/env node

import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';
import { fixHandler } from './commands/fix';
import { scanHandler } from './commands/scan';

yargs(hideBin(process.argv))
  .strict()
  .command(
    'fix <path>',
    'Scan and fix vulnerable dependencies in a package.json',
    (yarg) =>
      yarg
        .positional('path', {
          describe: 'Path to the project directory',
          type: 'string',
          default: '.',
        })
        .option('token', {
          describe: 'GitHub Personal Access Token',
          type: 'string',
          demandOption: true,
        })
        .option('repo', {
          describe: 'Target repository (owner/repo)',
          type: 'string',
          demandOption: true,
        })
        .option('dry-run', {
          describe: 'Print PR body without opening it',
          type: 'boolean',
          default: false,
        }),
    async (argv) => {
      await fixHandler({
        token: argv.token as string,
        repo: argv.repo as string,
        path: argv.path as string,
        dryRun: argv.dryRun as boolean,
      });
    },
  )
  .command(
    'scan <path>',
    'Scan for vulnerable dependencies with reachability analysis',
    (yarg) =>
      yarg
        .positional('path', {
          describe: 'Path to the project directory',
          type: 'string',
          default: '.',
        })
        .option('all', {
          describe: 'Show all vulnerabilities including not-reachable ones',
          type: 'boolean',
          default: false,
        }),
    async (argv) => {
      await scanHandler({
        path: argv.path as string,
        all: argv.all as boolean,
      });
    },
  )
  .demandCommand(1, 'Specify a command.')
  .parse();
