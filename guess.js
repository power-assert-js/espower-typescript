var fs = require('fs');
var path = require('path');

var pattern = 'test/**/*.@(ts|tsx)';
var cwd = process.cwd();
var packageData = require(path.join(cwd, 'package.json'));

if (packageData &&
    typeof packageData.directories === 'object' &&
    typeof packageData.directories.test === 'string') {
  var testDir = packageData.directories.test;
  pattern = testDir + ((testDir.lastIndexOf('/', 0) === 0) ? '' : '/') + '**/*.@(ts|tsx)';
}

require('./index')({
  cwd: cwd,
  pattern: pattern,
});
