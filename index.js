'use strict';

var fs = require('fs');

var espowerSource = require('espower-source');
var minimatch = require('minimatch');
var ts = require('typescript');
var TypeScriptSimple = require('typescript-simple').TypeScriptSimple;

function espowerTypeScript(options) {
  var separator = (options.pattern.lastIndexOf('/', 0) === 0) ? '' : '/';
  var pattern = options.cwd + separator + options.pattern;
  var compilerOptions = convertCompilerOptions(options.compilerOptions, options.basepath);
  var tss = new TypeScriptSimple(compilerOptions, false);

  require.extensions['.ts'] = function(localModule, filepath) {
    var result = tss.compile(fs.readFileSync(filepath, 'utf-8'));
    if (minimatch(filepath, pattern)) {
      result = espowerSource(result, filepath, options);
    }
    localModule._compile(result, filepath);
  };
}

function convertCompilerOptions(compilerOptions, basepath) {
  if (!compilerOptions) {
    return null;
  }

  var basepath = basepath || process.cwd();
  var converted = ts.convertCompilerOptionsFromJson(compilerOptions, basepath);
  if (converted.errors && converted.errors.length > 0) {
    var msg = converted.errors.map(function(e) {return e.messageText}).join(', ');
    throw new Error(msg);
  }
  return converted.options;
}

module.exports = espowerTypeScript;
