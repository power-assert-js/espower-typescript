/* eslint node/no-deprecated-api: [error, {ignoreGlobalItems: ["require.extensions"]}] */

'use strict';

const path = require('path');
const espowerSource = require('espower-source');
const minimatch = require('minimatch');
const tsNodeRegister = require('ts-node').register;

function espowerTypeScript(options, tsNodeOptions) {
  tsNodeRegister(tsNodeOptions);
  const {extensions = ['ts', 'tsx']} = options;
  extensions.forEach(ext => {
    espowerTsRegister(`.${ext}`, options);
  });
}

function espowerTsRegister(ext, options) {
  const cwd = options.cwd || process.cwd();
  const pattern = path.join(cwd, options.pattern);

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
