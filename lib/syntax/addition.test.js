import { strict as assert } from "node:assert";
import { describe, it } from "node:test";

import { parseMatches } from "../utils/parse-matches.js";
import { renderMatches } from "../utils/render-matches.js";

import { addition } from "./addition.js";

describe("addition", () => {
  it("should parse inline properly", () => {
    const input = `Lorem ipsum dolor{++ sit++} amet…`;
    const expectedOutput = [
      {
        type: "addition",
        inputText: "Lorem ipsum dolor{++ sit++} amet…",
        matchedText: "{++ sit++}",
        start: 17,
        end: 27,
        length: 10,
        content: { addition: " sit" },
      },
    ];

    const parsedMatches = parseMatches(input, addition);
    assert.deepStrictEqual(parsedMatches, expectedOutput);
  });

  it("should render inline properly", () => {
    const input = `Lorem ipsum dolor{++ sit++} amet…`;
    const expectedOutput = `Lorem ipsum dolor<ins> sit</ins> amet…`;

    const renderedMatches = renderMatches(input, addition);
    assert.strictEqual(renderedMatches, expectedOutput);
  });

  it("should parse added paragraph properly", () => {
    const input = `Lorem ipsum dolor{++\n\n++}sit amet…`;
    const expectedOutput = [
      {
        type: "addition",
        inputText: "Lorem ipsum dolor{++\n\n++}sit amet…",
        matchedText: "{++\n\n++}",
        start: 17,
        end: 25,
        length: 8,
        content: { addition: "\n\n" },
      },
    ];

    const parsedMatches = parseMatches(input, addition);
    assert.deepStrictEqual(parsedMatches, expectedOutput);
  });

  it("should render added paragraph properly", () => {
    const input = `Lorem ipsum dolor{++\n\n++}sit amet…`;
    const expectedOutput = `Lorem ipsum dolor\n\n<ins class="break">&nbsp;</ins>\n\nsit amet…`;

    const renderedMatches = renderMatches(input, addition);
    assert.strictEqual(renderedMatches, expectedOutput);
  });

  it("should escape HTML in rendered content", () => {
    const input = `Lorem{++<script>alert(1)</script>++} ipsum`;
    const expectedOutput = `Lorem<ins>&lt;script&gt;alert(1)&lt;/script&gt;</ins> ipsum`;

    const renderedMatches = renderMatches(input, addition);
    assert.strictEqual(renderedMatches, expectedOutput);
  });

  it("should pass through HTML unescaped when escape option is false", () => {
    const input = `Lorem{++<b>ipsum</b>++} dolor`;
    const expectedOutput = `Lorem<ins><b>ipsum</b></ins> dolor`;

    const renderedMatches = renderMatches(input, addition, { escape: false });
    assert.strictEqual(renderedMatches, expectedOutput);
  });

  it("should not match an unterminated addition", () => {
    const input = `Lorem ipsum dolor{++ sit amet, no closing tag`;

    const parsedMatches = parseMatches(input, addition);
    assert.deepStrictEqual(parsedMatches, []);

    const renderedMatches = renderMatches(input, addition);
    assert.strictEqual(renderedMatches, input);
  });
});
