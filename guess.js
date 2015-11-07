var fs = require('fs');
var path = require('path');

var ts = require('typescript');

var pattern = 'test/**/*.ts';
var packageData = require(path.join(process.cwd(), 'package.json'));

if (packageData &&
    typeof packageData.directories === 'object' &&
    typeof packageData.directories.test === 'string') {
  var testDir = packageData.directories.test;
  pattern = testDir + ((testDir.lastIndexOf('/', 0) === 0) ? '' : '/') + '**/*.ts';
}

var compilerOptions = findAndParseTsConfig(process.cwd());

require('./index')({
    cwd: process.cwd(),
    pattern: pattern,
    compilerOptions: compilerOptions
});

function findAndParseTsConfig(cwd) {
  var tsconfigPath = ts.findConfigFile(process.cwd());
  if (!tsconfigPath) {
    return null;
  }

  var compilerOptions = null;
  var parsed = ts.parseConfigFileTextToJson(tsconfigPath, fs.readFileSync(tsconfigPath, 'utf8'));
  if (parsed.error) {
    throw new Error(parsed.error.messageText);
  }

  if (!parsed.config || !parsed.config.compilerOptions) {
    return null;
  }

  var converted = ts.convertCompilerOptionsFromJson(parsed.config.compilerOptions, process.cwd());
  if (converted.errors && converted.errors.length > 0) {
    var msg = converted.errors.map(function(e) {return e.messageText}).join(', ');
    throw new Error(msg);
  }
  return converted.options;
}
