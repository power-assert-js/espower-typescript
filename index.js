'use strict';

var fs = require('fs');

var espowerSource = require('espower-source');
var minimatch = require('minimatch');
var TypeScriptSimple = require('typescript-simple').TypeScriptSimple;

function espowerTypeScript(options) {
  var separator = (options.pattern.lastIndexOf('/', 0) === 0) ? '' : '/';
  var pattern = options.cwd + separator + options.pattern;
  var tss = new TypeScriptSimple(options.compilerOptions, false);

  require.extensions['.ts'] = function(localModule, filepath) {
    var result = tss.compile(fs.readFileSync(filepath, 'utf-8'));
    if (minimatch(filepath, pattern)) {
      result = espowerSource(result, filepath, options);
    }
    localModule._compile(result, filepath);
  };
}

module.exports = espowerTypeScript;
