# CriticMarkup

[![License][badge-license]][link-license]
[![Version][badge-version]][link-version]
[![Build][badge-build]][link-build]

[badge-license]: https://img.shields.io/npm/l/critic-markup.svg
[link-license]:https://github.com/vimtaai/critic-markup/blob/master/LICENSE.md
[badge-version]: https://img.shields.io/npm/v/critic-markup.svg
[link-version]: https://www.npmjs.com/package/critic-markup
[badge-build]: https://github.com/vimtaai/critic-markup/actions/workflows/test.yml/badge.svg
[link-build]: https://github.com/vimtaai/critic-markup/actions/workflows/test.yml

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
