# CriticMarkup

[![License][badge-license]](https://github.com/vimtaai/critic-markup/blob/master/LICENSE.md)
[![Version][badge-version]](https://www.npmjs.com/package/critic-markup)
[![Code style][badge-style]](https://github.com/prettier/prettier)
[![Build][badge-build]](https://travis-ci.org/vimtaai/critic-markup)

[badge-license]: https://img.shields.io/npm/l/critic-markup.svg
[badge-version]: https://img.shields.io/npm/v/critic-markup.svg?logo=npm
[badge-style]: https://img.shields.io/badge/code_style-prettier-ff69b4.svg?logo=prettier
[badge-build]: https://img.shields.io/github/workflow/status/vimtaai/ci-cd/master?logo=github

---

This package is an implementation of [CriticMarkup](http://criticmarkup.com/) in JavaScript as a Node.js package/module. It provides functions to parse CriticMarkup syntax or render it into HTML.

## Installation

Install via `npm`:

```bash
npm install critic-markup
```

## Usage

The `critic-markup` package exposes two functions, `parse()` and `render()`. The `parse()` function returns an array of all the CriticMarkup tag occurrences in a string with their most important metadata. The `render()` function replaces all CriticMarkup tags with their HTML equivalent in the input.

```js
import { parse, render } from 'critic-markup';

parse(`Lorem{++ ipsum++} dolor sit amet.`);
// [{
//   type: "addition",
//   inputText: "Lorem{++ ipsum++} dolor sit amet.",
//   matchedText: "{++ ipsum++},
//   start: 5,
//   end: 17,
//   length: 12,
//   content: { addition: " ipsum" }
// }]

render(`Lorem{++ ipsum++} dolor sit amet.`);
// Lorem<ins> ipsum</ins> dolor sit amet.
```

## Contributing

All ideas, recommendations, bug reports, pull requests are welcome. 🙂