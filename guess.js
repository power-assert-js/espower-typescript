var fs = require('fs');
var path = require('path');

var ts = require('typescript');
var tsconfigPath = ts.findConfigFile(cwd, fs.existsSync);
var tsconfigBasepath = null;
var compilerOptions = null;
if (tsconfigPath) {
  compilerOptions = parseTsConfig(tsconfigPath);
  tsconfigBasepath = path.dirname(tsconfigPath);
}
var allowJs = (compilerOptions && compilerOptions.allowJs);

var cwd = process.cwd();
var packageData = require(path.join(cwd, 'package.json'));
var testDir;
if (packageData &&
    typeof packageData.directories === 'object' &&
    typeof packageData.directories.test === 'string') {
    testDir = packageData.directories.test;
} else {
    testDir = 'test';
}
var pattern = testDir + ((testDir.lastIndexOf('/', 0) === 0) ? '' : '/') + (allowJs ? '**/*.{js,ts}' : '**/*.ts');

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
