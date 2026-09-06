import { strict as assert } from "node:assert";
import { describe, it } from "node:test";

import { parseMatches } from "../utils/parse-matches.js";
import { renderMatches } from "../utils/render-matches.js";

import { highlight } from "./highlight.js";

describe("highlight", () => {
  it("should parse inline properly", () => {
    const input = "Lorem ipsum dolor {==sit==}{>>amet<<}…";
    const expectedOutput = [
      {
        type: "highlight",
        inputText: "Lorem ipsum dolor {==sit==}{>>amet<<}…",
        matchedText: "{==sit==}{>>amet<<}",
        start: 18,
        end: 37,
        length: 19,
        content: { highlight: "sit", comment: "amet" },
      },
    ];

    const parsedMatches = parseMatches(input, highlight);
    assert.deepStrictEqual(parsedMatches, expectedOutput);
  });

  it("should render inline properly", () => {
    const input = "Lorem ipsum dolor {==sit==}{>>amet<<}…";
    const expectedOutput =
      'Lorem ipsum dolor <mark>sit</mark><span class="critic comment">amet</span>…';

    const renderedMatches = renderMatches(input, highlight);
    assert.strictEqual(renderedMatches, expectedOutput);
  });

  it("should parse standalone (no comment) properly", () => {
    const input = "Lorem ipsum dolor {==sit==}…";
    const expectedOutput = [
      {
        type: "highlight",
        inputText: "Lorem ipsum dolor {==sit==}…",
        matchedText: "{==sit==}",
        start: 18,
        end: 27,
        length: 9,
        content: { highlight: "sit", comment: undefined },
      },
    ];

    const parsedMatches = parseMatches(input, highlight);
    assert.deepStrictEqual(parsedMatches, expectedOutput);
  });

  it("should render standalone (no comment) properly", () => {
    const input = "Lorem ipsum dolor {==sit==}…";
    const expectedOutput = "Lorem ipsum dolor <mark>sit</mark>…";

    const renderedMatches = renderMatches(input, highlight);
    assert.strictEqual(renderedMatches, expectedOutput);
  });

  it("should escape HTML in rendered highlight and comment content", () => {
    const input = "Lorem {==<b>sit</b>==}{>><i>amet</i><<}…";
    const expectedOutput =
      'Lorem <mark>&lt;b&gt;sit&lt;/b&gt;</mark><span class="critic comment">&lt;i&gt;amet&lt;/i&gt;</span>…';

    const renderedMatches = renderMatches(input, highlight);
    assert.strictEqual(renderedMatches, expectedOutput);
  });

  it("should pass through HTML unescaped when escape option is false", () => {
    const input = "Lorem {==<b>sit</b>==}{>><i>amet</i><<}…";
    const expectedOutput =
      'Lorem <mark><b>sit</b></mark><span class="critic comment"><i>amet</i></span>…';

    const renderedMatches = renderMatches(input, highlight, { escape: false });
    assert.strictEqual(renderedMatches, expectedOutput);
  });

  it("should not match an unterminated highlight", () => {
    const input = "Lorem ipsum dolor {==sit amet, no closing tag";

    const parsedMatches = parseMatches(input, highlight);
    assert.deepStrictEqual(parsedMatches, []);

    const renderedMatches = renderMatches(input, highlight);
    assert.strictEqual(renderedMatches, input);
  });
});
