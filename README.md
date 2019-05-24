# Critic Markup

[![NPM version 0.1.0][badge-package]](https://www.npmjs.com/package/critic-markup)
[![MIT license][badge-license]](https://opensource.org/licenses/MIT)
[![Prettier][badge-prettier]](https://github.com/prettier/prettier)
[![Travis CI][badge-travis]](https://travis-ci.org/vimtaai/critic-markup)
[![Coverage Status](badge-coveralls)](https://coveralls.io/github/vimtaai/critic-markup?branch=master)

[badge-package]: https://img.shields.io/badge/npm-0.1.0-cc3534.svg?style=flat-square
[badge-license]: https://img.shields.io/github/license/vimtaai/critic-markup.svg?style=flat-square
[badge-prettier]: https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square
[badge-travis]: https://img.shields.io/travis/vimtaai/critic-markup.svg?style=flat-square
[badge-coveralls]: https://img.shields.io/coveralls/github/vimtaai/critic-markup.svg?style=flat-square

> CriticMarkup in JavaScript

This package is an implementation of [CriticMarkup](http://criticmarkup.com/) in JavaScript as a Node.js package. It provides a function to render CriticMarkup syntax into HTML.

## Usage

Install the package:

```bash
npm install critic-markup
```

The `critic-markup` package exposes a single function, `renderCriticMarkup()` as an object member.

```js
const { renderCriticMarkup } = require('critic-markup');

renderCriticMarkup(`Lorem{++ ipsum++} dolor sit amet.`);
// Lorem<ins> ipsum</ins> dolor sit amet.
```

## Contributing

All ideas, recommendations, bug reports, pull requests are welcome. 🙂
