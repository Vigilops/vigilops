# vigilops-demo

A one-file Node.js fixture used by [VigilOps](../../) as a quickstart
demo. It pins `lodash@4.17.15` and imports it from `index.js` so
`vigilops scan .` produces real reachable-vulnerability output
immediately.

## Try it

From the repository root:

```bash
cd examples/vigilops-demo
npm install
npx tsx ../../src/cli/index.ts scan .
```

Outbound HTTPS to `api.osv.dev` is required (VigilOps queries the OSV
database for each declared dependency).
