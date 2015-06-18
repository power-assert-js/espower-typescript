espower-typescript [![npm version][npm-image]][npm-url] [![build status][travis-image]][travis-url] [![Dependency Status][deps-image]][deps-url]
====

> power-assert instrumentor for TypeScript

## Install

```console
$ npm install -D espower-typescript
```

## Usage

### Zero-config mode

```console
$ mocha --compilers ts:espower-typescript/guess test/**/*.ts
```

### If your tests are not in test dir

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

Then, run mocha with `--compilers js:espower-typescript/guess`

```console
$ mocha --compilers ts:espower-typescript/guess spec/**/*.ts
```

Note: `'espower-typescript/guess'` is inspired by [intelli-espower-loader](https://github.com/azu/intelli-espower-loader)

### tsconfig.json

TODO

## License

* MIT License: Teppei Sato &lt;teppeis@gmail.com&gt;
* Includes [yosuke-furukawa/espower-traceur](https://github.com/yosuke-furukawa/espower-traceur)
* Includes [azu/espower-babel](https://github.com/azu/espower-babel)

[npm-image]: https://img.shields.io/npm/v/espower-typescript.svg
[npm-url]: https://npmjs.org/package/espower-typescript
[travis-image]: https://travis-ci.org/power-assert-js/espower-typescript.svg?branch=master
[travis-url]: https://travis-ci.org/power-assert-js/espower-typescript
[deps-image]: https://david-dm.org/power-assert-js/espower-typescript.svg
[deps-url]: https://david-dm.org/power-assert-js/espower-typescript
