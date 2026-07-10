# vigilops-demo-express

A one-file Node.js fixture used by [VigilOps](../../) as a quickstart
demo. It pins `express@4.18.2` (which transitively pulls a vulnerable `qs`
version) and imports it from `index.js` so `vigilops scan .` produces
real reachable-vulnerability output immediately. A second dep
(`minimist@0.0.8`) is declared in `devDependencies` but not imported,
demonstrating how unreached dependencies are suppressed from default
output and surfaced only with `--all`.

## Try it

From the repository root:

```bash
cd examples/vigilops-demo-express
npm install
npx tsx ../../src/cli/index.ts scan .
```

To also see the suppressed not-reachable `minimist` rows:

```bash
npx tsx ../../src/cli/index.ts scan . --all
```

Outbound HTTPS to `api.osv.dev` is required (VigilOps queries the OSV
database for each declared dependency).