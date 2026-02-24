const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const reportDir = path.join(__dirname, 'playwright-report');

const subdirs = fs.readdirSync(reportDir)
  .map(name => path.join(reportDir, name))
  .filter(source => fs.lstatSync(source).isDirectory())
  .sort((a, b) => fs.statSync(b).mtime - fs.statSync(a).mtime);

if (subdirs.length === 0) {
  console.log('No reports found in playwright-report/');
  process.exit(1);
}

const latestReport = subdirs[0];

console.log('Opening latest report:', latestReport);
execSync(`npx playwright show-report "${latestReport}"`, { stdio: 'inherit' });