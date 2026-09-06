# CriticMarkup

[![License][license-badge]][license-link]
[![Version][version-badge]][version-link]
[![Build][build-badge]][build-link]

Implementation of [CriticMarkup](http://criticmarkup.com/) in JavaScript as a Node.js package/module. It provides functions to parse CriticMarkup syntax or render it into HTML.

## Setup

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

By default, `render()` HTML-escapes the content of every matched tag, since this package makes no
assumption about what kind of document it's applied to, the content could be untrusted plain
text. If you know the content is trusted markup/HTML that should pass through unescaped (for
example, when post-processing already-rendered output), pass `{ escape: false }`:

```js
render(`Lorem ipsum {==<em>dolor sit amet</em>==}`, { escape: false });
// Lorem ipsum <mark><em>dolor sit amet</em></mark>
```

## Contributing

All ideas, recommendations, bug reports, pull requests are welcome. 😊

[license-badge]: https://img.shields.io/npm/l/critic-markup.svg
[license-link]:https://github.com/vimtaai/critic-markup/blob/master/LICENSE.md
[version-badge]: https://img.shields.io/npm/v/critic-markup.svg
[version-link]: https://www.npmjs.com/package/critic-markup
[build-badge]: https://github.com/vimtaai/critic-markup/actions/workflows/main.yaml/badge.svg
[build-link]: https://github.com/vimtaai/critic-markup/actions/workflows/main.yaml