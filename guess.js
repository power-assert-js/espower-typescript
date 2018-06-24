'use strict';

const path = require('path');

let pattern = 'test/**/*.@(ts|tsx)';
const cwd = process.cwd();
const packageData = require(path.join(cwd, 'package.json'));

if (
  packageData &&
  typeof packageData.directories === 'object' &&
  typeof packageData.directories.test === 'string'
) {
  const testDir = packageData.directories.test;
  pattern = `${testDir + (testDir.lastIndexOf('/', 0) === 0 ? '' : '/')}**/*.@(ts|tsx)`;
}

require('./index')({
  cwd: cwd,
  pattern: pattern,
});
