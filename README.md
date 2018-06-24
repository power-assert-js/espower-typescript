# espower-typescript

> power-assert instrumentor for TypeScript

[![npm version][npm-image]][npm-url]
![Node.js Version Support][node-version]
[![build status][travis-image]][travis-url]
[![Dependency Status][deps-image]][deps-url]
![License][license]

## TypeScript versions

espower-typescript v9.x is compatible with TypeScript v2.4+

## Usage

NOTE: If you use older version than v9, see older document.

### Install

```console
$ npm install -D espower-typescript power-assert mocha typescript @types/node @types/mocha
```

### Zero-config mode

```typescript
// test/test.ts
import assert = require('assert');

describe('Array#join', () => {
  it('joins all elements into a string with separator', () => {
    assert(['a', 'b', 'c'].join(':') === 'a:b:c');
  });
});
```

```console
$ ./node_modules/.bin/mocha --require espower-typescript/guess "test/**/*.ts"
```

### If your tests are not in `test` directory

You can set test directory in your `package.json`

```json
{
    "name": "your-module",
    "description": "Your module",
    "version": "0.0.1",
    "directories": {
        "test": "spec/"
    },
...
}
```

Then, run mocha with `--require espower-typescript/guess`

```console
$ ./node_modules/.bin/mocha --require espower-typescript/guess "spec/**/*.ts"
```

Note: `'espower-typescript/guess'` is inspired by [intelli-espower-loader](https://github.com/azu/intelli-espower-loader)

### ts-node and `tsconfig.json`

espower-typescript uses [ts-node](https://github.com/TypeStrong/ts-node) internally.
It loads your [tsconfig.json](https://github.com/Microsoft/TypeScript/wiki/tsconfig.json) automatically.

### JSX/React

`.tsx` files are supported.

### `allowJs`

If `allowJs: true` in your `tsconfig.json`, assertions in `test/**/*.(js|jsx)` are empowered.

## License

- MIT License: Teppei Sato &lt;teppeis@gmail.com&gt;
- Includes [yosuke-furukawa/espower-traceur](https://github.com/yosuke-furukawa/espower-traceur)
- Includes [azu/espower-babel](https://github.com/azu/espower-babel)

[npm-image]: https://img.shields.io/npm/v/espower-typescript.svg
[npm-url]: https://npmjs.org/package/espower-typescript
[travis-image]: https://travis-ci.org/power-assert-js/espower-typescript.svg?branch=master
[travis-url]: https://travis-ci.org/power-assert-js/espower-typescript
[deps-image]: https://david-dm.org/power-assert-js/espower-typescript.svg
[deps-url]: https://david-dm.org/power-assert-js/espower-typescript
[node-version]: https://img.shields.io/badge/Node.js%20support-v6,v8,v10-brightgreen.svg
[license]: https://img.shields.io/npm/l/espower-typescript.svg
