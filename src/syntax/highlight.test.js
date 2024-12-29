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
        content: { highlight: "sit", comment: "amet" }
      }
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
});
