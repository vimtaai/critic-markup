# CriticMarkup

[![NPM version 0.1.0][badge-package]](https://www.npmjs.com/package/critic-markup)
[![MIT license][badge-license]](https://opensource.org/licenses/MIT)
[![Prettier][badge-prettier]](https://github.com/prettier/prettier)
[![Travis CI][badge-travis]](https://travis-ci.org/vimtaai/critic-markup)
[![Coverage Status][badge-coveralls]](https://coveralls.io/github/vimtaai/critic-markup?branch=master)

[badge-package]: https://img.shields.io/npm/v/critic-markup.svg?style=flat-square
[badge-license]: https://img.shields.io/github/license/vimtaai/critic-markup.svg?style=flat-square
[badge-prettier]: https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square
[badge-travis]: https://img.shields.io/travis/vimtaai/critic-markup.svg?style=flat-square
[badge-coveralls]: https://img.shields.io/coveralls/github/vimtaai/critic-markup.svg?style=flat-square

> CriticMarkup in JavaScript

This package is an implementation of [CriticMarkup](http://criticmarkup.com/) in JavaScript as a Node.js package. It provides a function to parse CriticMarkup syntax or render it into HTML.

## Usage

Install the package:

```bash
npm install critic-markup
```

The `critic-markup` package exposes a two functions, `parse()` and `render()` as object members. The `parse()` function returns an array of all the CriticMarkup tag occurrences in a string with their most important metadata. The `render()` function returns the HTML equivalent of the CriticMarkup code as a string.

```js
const { parse, render } = require('critic-markup');

parse(`Lorem{++ ipsum++} dolor sit amet.`);
// [{
//   type: "addition",
//   start: 5,
//   end: 17,
//   length: 12,
//   content: [" ipsum"]
// }]

render(`Lorem{++ ipsum++} dolor sit amet.`);
// Lorem<ins> ipsum</ins> dolor sit amet.
```

## Contributing

All ideas, recommendations, bug reports, pull requests are welcome. 🙂
