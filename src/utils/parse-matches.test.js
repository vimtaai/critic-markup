import { strict as assert } from "node:assert";
import { describe, it } from "node:test";

import { parseMatches } from "./parse-matches.js";

describe("parseMatches", () => {
  it("should find all matches", () => {
    const tokenType = {
      regex: new RegExp(/AB/, "gs"),
      validate: () => true,
      annotate: (token) => token
    };
    const inputText = "A AB B AB";

    const parsedMatches = parseMatches(inputText, tokenType);
    assert.strictEqual(parsedMatches.length, 2);
  });

  it("should remove all invalid matches", () => {
    const tokenType = {
      regex: new RegExp(/(?<foo>A[BC])/, "gs"),
      validate: (token) => token.content.foo !== "AC",
      annotate: (token) => token
    };
    const inputText = "A AC B AB";

    const parsedMatches = parseMatches(inputText, tokenType);
    assert.strictEqual(parsedMatches.length, 1);
  });

  it("should create match tokens", () => {
    const tokenType = {
      regex: new RegExp(/(?<foo>AB)/, "gs"),
      validate: () => true,
      annotate: (token) => ({ type: "foo", ...token })
    };
    const inputText = "A AB B AB";

    const parsedMatches = parseMatches(inputText, tokenType);
    assert.deepStrictEqual(parsedMatches, [
      {
        type: "foo",
        inputText: "A AB B AB",
        matchedText: "AB",
        start: 2,
        end: 4,
        length: 2,
        content: { foo: "AB" }
      },
      {
        type: "foo",
        inputText: "A AB B AB",
        matchedText: "AB",
        start: 7,
        end: 9,
        length: 2,
        content: { foo: "AB" }
      }
    ]);
  });
});
