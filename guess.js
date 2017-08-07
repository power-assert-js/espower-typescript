var fs = require('fs');
var path = require('path');

var ts = require('typescript');

var pattern = 'test/**/*.@(ts|tsx)';
var cwd = process.cwd();
var packageData = require(path.join(cwd, 'package.json'));

if (packageData &&
    typeof packageData.directories === 'object' &&
    typeof packageData.directories.test === 'string') {
  var testDir = packageData.directories.test;
  pattern = testDir + ((testDir.lastIndexOf('/', 0) === 0) ? '' : '/') + '**/*.@(ts|tsx)';
}

var tsconfigPath = ts.findConfigFile(cwd, fs.existsSync);
var tsconfigBasepath = null;
var compilerOptions = null;
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

function parseTsConfig(tsconfigPath) {
  var parsed = ts.parseConfigFileTextToJson(tsconfigPath, fs.readFileSync(tsconfigPath, 'utf8'));
  if (parsed.error) {
    throw new Error(parsed.error.messageText);
  }

  if (!parsed.config || !parsed.config.compilerOptions) {
    return null;
  }

  return parsed.config.compilerOptions;
}
