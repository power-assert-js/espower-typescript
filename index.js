'use strict';

const fs = require('fs');
const path = require('path');

const espowerSource = require('espower-source');
const minimatch = require('minimatch');
const ts = require('typescript');
const TypeScriptSimple = require('typescript-simple').TypeScriptSimple;

function espowerTypeScript(options) {
  const cwd = options.cwd || process.cwd();
  const separator = (options.pattern.lastIndexOf('/', 0) === 0) ? '' : '/';
  const pattern = cwd + separator + options.pattern;
  const compilerOptions = convertCompilerOptions(options.compilerOptions, options.basepath || cwd);
  const tss = new TypeScriptSimple(compilerOptions, false);

  function loadTypeScript(localModule, filepath) {
    let result = tss.compile(fs.readFileSync(filepath, 'utf-8'), path.relative(cwd, filepath));
    if (minimatch(filepath, pattern)) {
      result = espowerSource(result, filepath, options);
    }
    localModule._compile(result, filepath);
  }

  /* eslint-disable node/no-deprecated-api */
  require.extensions['.ts'] = loadTypeScript;
  require.extensions['.tsx'] = loadTypeScript;
  /* eslint-enable node/no-deprecated-api */
}

function convertCompilerOptions(compilerOptions, basepath) {
  if (!compilerOptions) {
    return null;
  }

  const converted = ts.convertCompilerOptionsFromJson(compilerOptions, basepath);
  if (converted.errors && converted.errors.length > 0) {
    const msg = converted.errors.map(e => e.messageText).join(', ');
    throw new Error(msg);
  }
  return converted.options;
}

module.exports = espowerTypeScript;
