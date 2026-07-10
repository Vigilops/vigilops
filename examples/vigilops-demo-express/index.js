// Quickstart demo fixture for VigilOps.
// Exercises the express + qs prototype-pollution vulnerability class
// (different from the lodash prototype-pollution class in vigilops-demo).
// express is REACHABLE; minimist is declared in devDependencies but
// not imported, so it demonstrates the not-reachable suppression.
const express = require('express');
const app = express();

void app;
