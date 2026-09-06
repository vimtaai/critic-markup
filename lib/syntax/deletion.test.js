import { strict as assert } from "node:assert";
import { describe, it } from "node:test";

import { parseMatches } from "../utils/parse-matches.js";
import { renderMatches } from "../utils/render-matches.js";

import { deletion } from "./deletion.js";

describe("deletion", () => {
  it("should parse inline properly", () => {
    const input = `Lorem{-- ipsum--} dolor sit amet…`;
    const expectedOutput = [
      {
        type: "deletion",
        inputText: "Lorem{-- ipsum--} dolor sit amet…",
        matchedText: "{-- ipsum--}",
        start: 5,
        end: 17,
        length: 12,
        content: { deletion: " ipsum" },
      },
    ];

    const parsedMatches = parseMatches(input, deletion);
    assert.deepStrictEqual(parsedMatches, expectedOutput);
  });

  it("should render inline properly", () => {
    const input = `Lorem{-- ipsum--} dolor sit amet…`;
    const expectedOutput = `Lorem<del> ipsum</del> dolor sit amet…`;

    const renderedMatches = renderMatches(input, deletion);
    assert.strictEqual(renderedMatches, expectedOutput);
  });

  it("should parse added paragraph properly", () => {
    const input = `Lorem ipsum dolor{--\n\n--}sit amet…`;
    const expectedOutput = [
      {
        type: "deletion",
        inputText: "Lorem ipsum dolor{--\n\n--}sit amet…",
        matchedText: "{--\n\n--}",
        start: 17,
        end: 25,
        length: 8,
        content: { deletion: "\n\n" },
      },
    ];

    const parsedMatches = parseMatches(input, deletion);
    assert.deepStrictEqual(parsedMatches, expectedOutput);
  });

  it("should render deleted paragraph properly", () => {
    const input = `Lorem ipsum dolor{--\n\n--}sit amet…`;
    const expectedOutput = `Lorem ipsum dolor<del>&nbsp;</del> sit amet…`;

    const renderedMatches = renderMatches(input, deletion);
    assert.strictEqual(renderedMatches, expectedOutput);
  });

  it("should escape HTML in rendered content", () => {
    const input = `Lorem{--<script>alert(1)</script>--} ipsum`;
    const expectedOutput = `Lorem<del>&lt;script&gt;alert(1)&lt;/script&gt;</del> ipsum`;

    const renderedMatches = renderMatches(input, deletion);
    assert.strictEqual(renderedMatches, expectedOutput);
  });

  it("should pass through HTML unescaped when escape option is false", () => {
    const input = `Lorem{--<b>ipsum</b>--} dolor`;
    const expectedOutput = `Lorem<del><b>ipsum</b></del> dolor`;

    const renderedMatches = renderMatches(input, deletion, { escape: false });
    assert.strictEqual(renderedMatches, expectedOutput);
  });

  it("should not match an unterminated deletion", () => {
    const input = `Lorem ipsum dolor{-- sit amet, no closing tag`;

    const parsedMatches = parseMatches(input, deletion);
    assert.deepStrictEqual(parsedMatches, []);

    const renderedMatches = renderMatches(input, deletion);
    assert.strictEqual(renderedMatches, input);
  });
});
