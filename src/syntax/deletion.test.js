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
});
