## [5.0.2](https://github.com/markedjs/html-differ/compare/v5.0.1...v5.0.2) (2025-05-12)


### Bug Fixes

* **deps:** bump diff from 7.0.0 to 8.0.0 ([#458](https://github.com/markedjs/html-differ/issues/458)) ([eae8b41](https://github.com/markedjs/html-differ/commit/eae8b4142728b67f2a7872e2d3ce98f2cf3520f7))

## [5.0.1](https://github.com/markedjs/html-differ/compare/v5.0.0...v5.0.1) (2024-09-04)


### Bug Fixes

* blank strings are equal ([0a0e85e](https://github.com/markedjs/html-differ/commit/0a0e85e151440b3286275c5ad7ea51b488f03194))
* pass options to diff ([049cc7f](https://github.com/markedjs/html-differ/commit/049cc7fc23589822c4620b9e573ea43a1af058f1))
* update deps ([a772b10](https://github.com/markedjs/html-differ/commit/a772b106d868c6ae696d2085c0c6773d60b01cff))

# [5.0.0](https://github.com/markedjs/html-differ/compare/v4.0.2...v5.0.0) (2024-09-04)


### Bug Fixes

* **deps:** Bump diff from 5.2.0 to 6.0.0 ([#392](https://github.com/markedjs/html-differ/issues/392)) ([4b0d162](https://github.com/markedjs/html-differ/commit/4b0d16200b97f8096ec636c12e9d3d9aa12e6f01))


### BREAKING CHANGES

* **deps:** update diff to v6 ([changelog](https://github.com/kpdecker/jsdiff/blob/master/release-notes.md#600-currently-in-beta))

## [4.0.2](https://github.com/markedjs/html-differ/compare/v4.0.1...v4.0.2) (2022-04-24)


### Bug Fixes

* update all deps ([#163](https://github.com/markedjs/html-differ/issues/163)) ([8e6fb1c](https://github.com/markedjs/html-differ/commit/8e6fb1c88abd395832c07a930371b3559cd438f1))

## [4.0.1](https://github.com/markedjs/html-differ/compare/v4.0.0...v4.0.1) (2022-03-12)


### Bug Fixes

* avoid memory leak and concurrency issues ([#157](https://github.com/markedjs/html-differ/issues/157)) ([b5f8c58](https://github.com/markedjs/html-differ/commit/b5f8c58e21af3f264ccf45e6f52abeebd601b3f1))

# [4.0.0](https://github.com/markedjs/html-differ/compare/v3.0.4...v4.0.0) (2021-11-28)


### Bug Fixes

* move to esm ([#144](https://github.com/markedjs/html-differ/issues/144)) ([01ffb6d](https://github.com/markedjs/html-differ/commit/01ffb6df8aaa9f9672f37e11b13e3db124d934aa))


### BREAKING CHANGES

* some default exports changed to named exports.

## [3.0.4](https://github.com/markedjs/html-differ/compare/v3.0.3...v3.0.4) (2020-11-09)


### Bug Fixes

* **deps:** Bump diff from 4.0.2 to 5.0.0 ([#43](https://github.com/markedjs/html-differ/issues/43)) ([79673a6](https://github.com/markedjs/html-differ/commit/79673a6c6fe09ee96e17c66b4b670bc97075e207))

## [3.0.3](https://github.com/markedjs/html-differ/compare/v3.0.2...v3.0.3) (2020-07-24)


### Bug Fixes

* **deps:** add dependabot to update deps regularly ([49fe5ad](https://github.com/markedjs/html-differ/commit/49fe5ad082a02a1cb3e7c0547e6ccda21c9916b5))
* **deps:** update chalk to v4.1.0 ([1538bb7](https://github.com/markedjs/html-differ/commit/1538bb7e8c3f1a6d3d547ddbf1c0ecbe4f50b1fa))
* **deps:** update package-lock.json ([9f87b60](https://github.com/markedjs/html-differ/commit/9f87b60bf79b4cc8d3a4a78ef9b194d6f6013d0f))
* **deps:** update parse5-sax-parser to v6.0.1 ([53cb4f6](https://github.com/markedjs/html-differ/commit/53cb4f67c90d7669dd58e4311d1b432145d62c7c))

## [3.0.2](https://github.com/markedjs/html-differ/compare/v3.0.1...v3.0.2) (2020-04-28)


### Bug Fixes

* don't reorder attrs with the same name ([#14](https://github.com/markedjs/html-differ/issues/14)) ([f9706c8](https://github.com/markedjs/html-differ/commit/f9706c8705ea08987248df2059f97e60d0d5beaa))

## [3.0.1](https://github.com/markedjs/html-differ/compare/v3.0.0...v3.0.1) (2020-04-15)


### Bug Fixes

* **deps:** update deps and add semantic-release ([93ccb89](https://github.com/markedjs/html-differ/commit/93ccb893d5642bed48a06df5adad5d1c46b9226d))

History of changes
==================

2.0.1
-----

*   Update dependencies to prevent vulnerabilities (see [#9](https://github.com/markedjs/html-differ/pull/9))

2.0.0
-----

*   Forked from https://github.com/bem/html-differ
*   Added option [ignoreSelfClosingSlash](https://github.com/markedjs/html-differ/tree/v2.0.0#ignoreSelfClosingSlash-boolean) (see [#2](https://github.com/markedjs/html-differ/pull/2)).
*   Fixed newline inside tags (see [#3](https://github.com/markedjs/html-differ/pull/3)).
*   **BREAKING:** Only support Node latest and LTS

**See older changelog at:** [bem/html-differ](https://github.com/bem/html-differ/blob/master/CHANGELOG.md)
