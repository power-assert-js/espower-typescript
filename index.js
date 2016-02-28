'use strict';

var fs = require('fs');
var path = require('path');

var espowerSource = require('espower-source');
var minimatch = require('minimatch');
var ts = require('typescript');
var TypeScriptSimple = require('typescript-simple').TypeScriptSimple;

function espowerTypeScript(options) {
  var cwd = options.cwd || process.cwd();
  var separator = (options.pattern.lastIndexOf('/', 0) === 0) ? '' : '/';
  var pattern = cwd + separator + options.pattern;
  var compilerOptions = convertCompilerOptions(options.compilerOptions, options.basepath || cwd);
  var tss = new TypeScriptSimple(compilerOptions, false);

  function loadTypeScript(localModule, filepath) {
    var result = tss.compile(fs.readFileSync(filepath, 'utf-8'), path.relative(cwd, filepath));
    if (minimatch(filepath, pattern)) {
      result = espowerSource(result, filepath, options);
    }
    localModule._compile(result, filepath);
  };

  require.extensions['.ts'] = loadTypeScript;
  require.extensions['.tsx'] = loadTypeScript;
}

function convertCompilerOptions(compilerOptions, basepath) {
  if (!compilerOptions) {
    return null;
  }

  var converted = ts.convertCompilerOptionsFromJson(compilerOptions, basepath);
  if (converted.errors && converted.errors.length > 0) {
    var msg = converted.errors.map(function(e) {return e.messageText}).join(', ');
    throw new Error(msg);
  }
  return converted.options;
}

module.exports = espowerTypeScript;
