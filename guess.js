'use strict';

const fs = require('fs');
const path = require('path');

const ts = require('typescript');

let pattern = 'test/**/*.ts';
let cwd = process.cwd();
let packageData = require(path.join(cwd, 'package.json'));

if (packageData &&
    typeof packageData.directories === 'object' &&
    typeof packageData.directories.test === 'string') {
  let testDir = packageData.directories.test;
  pattern = `${testDir + ((testDir.lastIndexOf('/', 0) === 0) ? '' : '/')}**/*.ts`;
}

let tsconfigPath = ts.findConfigFile(cwd, fs.existsSync);
let tsconfigBasepath = null;
let compilerOptions = null;
if (tsconfigPath) {
  compilerOptions = parseTsConfig(tsconfigPath);
  tsconfigBasepath = path.dirname(tsconfigPath);
}

require('./index')({
  cwd: cwd,
  pattern: pattern,
  compilerOptions: compilerOptions,
  basepath: tsconfigBasepath
});

// eslint-disable-next-line no-shadow
function parseTsConfig(tsconfigPath) {
  let parsed = ts.parseConfigFileTextToJson(tsconfigPath, fs.readFileSync(tsconfigPath, 'utf8'));
  if (parsed.error) {
    throw new Error(parsed.error.messageText);
  }

  if (!parsed.config || !parsed.config.compilerOptions) {
    return null;
  }

  return parsed.config.compilerOptions;
}
