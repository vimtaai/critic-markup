# CriticMarkup

[![Version][badge-version]](https://www.npmjs.com/package/critic-markup)
[![License][badge-license]](https://github.com/vimtaai/critic-markup/blob/master/LICENSE.md)
[![Code style][badge-style]](https://github.com/prettier/prettier)
[![Build][badge-build]](https://travis-ci.org/vimtaai/critic-markup)
[![Coverage][badge-coverage]](https://coveralls.io/github/vimtaai/critic-markup?branch=master)

> CriticMarkup in JavaScript

This package is an implementation of [CriticMarkup](http://criticmarkup.com/) in JavaScript as a Node.js package. It provides a function to parse CriticMarkup syntax or render it into HTML.

## Installation

Install via `npm`:

```bash
npm install critic-markup
```

Load from a CDN:

```html
<script src="https://cdn.jsdelivr.net/npm/critic-markup"></script>
```

## Usage

The `critic-markup` package exposes two functions, `parse()` and `render()`. The `parse()` function returns an array of all the CriticMarkup tag occurrences in a string with their most important metadata. The `render()` function returns the HTML equivalent of the CriticMarkup code as a string.

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

In a browser environment you can access the `parse()` and `render()` functions via the `CriticMarkup` global object.

```js
const { parse, render } = CriticMarkup;
```

## Contributing

All ideas, recommendations, bug reports, pull requests are welcome. 🙂

[badge-version]: https://img.shields.io/npm/v/critic-markup.svg?style=flat-square
[badge-license]: https://img.shields.io/npm/l/critic-markup.svg?style=flat-square
[badge-style]: https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square
[badge-build]: https://img.shields.io/travis/vimtaai/critic-markup.svg?style=flat-square
[badge-coverage]: https://img.shields.io/coveralls/github/vimtaai/critic-markup.svg?style=flat-square