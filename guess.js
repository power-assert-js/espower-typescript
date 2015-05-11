var path = require('path');

var pattern = 'test/**/*.ts';
var packageData = require(path.join(process.cwd(), 'package.json'));

if (packageData &&
    typeof packageData.directories === 'object' &&
    typeof packageData.directories.test === 'string') {
  var testDir = packageData.directories.test;
  pattern = testDir + ((testDir.lastIndexOf('/', 0) === 0) ? '' : '/') + '**/*.ts';
}

require('./index')({
    cwd: process.cwd(),
    pattern: pattern
});
