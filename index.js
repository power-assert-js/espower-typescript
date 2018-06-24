/* eslint node/no-deprecated-api: [error, {ignoreGlobalItems: ["require.extensions"]}] */

'use strict';

const espowerSource = require('espower-source');
const minimatch = require('minimatch');
const tsNodeRegister = require('ts-node').register;

function espowerTypeScript(options) {
  tsNodeRegister(options.tsNode);
  espowerTsRegister('.ts', options);
  espowerTsRegister('.tsx', options);
}

function espowerTsRegister(ext, options) {
  const cwd = options.cwd || process.cwd();
  const separator = options.pattern.lastIndexOf('/', 0) === 0 ? '' : '/';
  const pattern = cwd + separator + options.pattern;

  const originalExtension = require.extensions[ext];
  require.extensions[ext] = (module, filepath) => {
    if (!minimatch(filepath, pattern)) {
      return originalExtension(module, filepath);
    }
    const originalCompile = module._compile;
    module._compile = function(code, filepath) {
      return originalCompile.call(this, espowerSource(code, filepath, options), filepath);
    };
    return originalExtension(module, filepath);
  };
}

module.exports = espowerTypeScript;
