# espower-typescript

> power-assert instrumentor for TypeScript

[![npm version][npm-image]][npm-url]
![Node.js Version Support][node-version]
![TypeScript Version Support][ts-version]
[![build status][ci-image]][ci-url]
[![Dependency Status][deps-image]][deps-url]
![monthly downloads][npm-downloads-image]
![License][license]

## TypeScript versions

espower-typescript v10.x is compatible with TypeScript v2.7+

## Usage (zero-config mode)

Install

```console
$ npm install -D espower-typescript power-assert mocha typescript @types/node @types/mocha
```

Create a test file (intensionally failed)

```typescript
// test/test.ts
import assert = require('assert');

describe('Array#join', () => {
  it('joins all elements into a string with separator', () => {
    assert(['a', 'b', 'c'].join(':') === 'a:b:c:');
  });
});
```

Run test

```console
$ ./node_modules/.bin/mocha --require espower-typescript/guess "test/**/*.ts"
```

Output

```
  1) Array#join
       joins all elements into a string with separator:

      AssertionError [ERR_ASSERTION]:   # test.ts:6

  assert(['a','b','c'].join(':') === 'a:b:c:')
         |             |         |
         ["a","b","c"] "a:b:c"   false
```

### CAUTION: don't use `import assert from 'assert'`

Just use old style `import assert = require('assert')` for assert module.
This is limitation.

## Configure

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

### Disable type check (transpile only)

Use `TS_NODE_TRANSPILE_ONLY` env of ts-node

```console
$ TS_NODE_TRANSPILE_ONLY=1 ./node_modules/.bin/mocha --require espower-typescript/guess "test/**/*.ts"
```

### JSX/React

`.tsx` files are supported.

### `allowJs`

If `allowJs: true` in your `tsconfig.json`, assertions in `test/**/*.(js|jsx)` are empowered.

## License

- MIT License: Teppei Sato &lt;teppeis@gmail.com&gt;
- Includes [yosuke-furukawa/espower-traceur](https://github.com/yosuke-furukawa/espower-traceur)
- Includes [azu/espower-babel](https://github.com/azu/espower-babel)

[npm-image]: https://badgen.net/npm/v/espower-typescript?icon=npm&label=
[npm-url]: https://npmjs.org/package/espower-typescript
[npm-downloads-image]: https://badgen.net/npm/dm/espower-typescript
[ci-image]: https://github.com/power-assert-js/espower-typescript/workflows/Node.js%20CI/badge.svg
[ci-url]: https://github.com/power-assert-js/espower-typescript/actions?query=workflow%3A%22Node.js+CI%22
[deps-image]: https://badgen.net/david/dep/power-assert-js/espower-typescript
[deps-url]: https://david-dm.org/power-assert-js/espower-typescript
[node-version]: https://badgen.net/npm/node/espower-typescript
[ts-version]: https://badgen.net/badge/typescript/%3E=2.7?icon=typescript
[license]: https://badgen.net/npm/license/espower-typescript
