import { strict as assert } from "node:assert";
import { describe, it } from "node:test";

import { renderMatches } from "./render-matches.js";

describe("parseMatches", () => {
  it("should replace all matches", () => {
    const tokenType = {
      regex: new RegExp(/(?<foo>AB)/, "gs"),
      validate: () => true,
      render: (token) => token.content.foo.toLowerCase(),
    };
    const inputText = "A AB B AB";

    const renderedMatches = renderMatches(inputText, tokenType);
    assert.strictEqual(renderedMatches, "A ab B ab");
  });

  it("should exclude all invalid matches", () => {
    const tokenType = {
      regex: new RegExp(/(?<foo>A[BC])/, "gs"),
      validate: (token) => token.content.foo !== "AC",
      render: (token) => token.content.foo.toLowerCase(),
    };
    const inputText = "A AC B AB";

    const renderedMatches = renderMatches(inputText, tokenType);
    assert.strictEqual(renderedMatches, "A AC B ab");
  });

  it("should replace matches with multiple capture groups", () => {
    const tokenType = {
      regex: new RegExp(/(?<foo>AB)-(?<bar>AC)/, "gs"),
      validate: () => true,
      render: (token) => `${token.content.foo.toLowerCase()}.${token.content.bar}`,
    };
    const inputText = "A AB-AC B AB-AC";

    const renderedMatches = renderMatches(inputText, tokenType);
    assert.strictEqual(renderedMatches, "A ab.AC B ab.AC");
  });

  it("should exclude invalid matches with multiple capture groups", () => {
    const tokenType = {
      regex: new RegExp(/(?<foo>AB)-(?<bar>A[BC])/, "gs"),
      validate: (token) => token.content.bar !== "AC",
      render: (token) => `${token.content.foo.toLowerCase()}.${token.content.bar}`,
    };
    const inputText = "A AB-AC B AB-AB";

    const renderedMatches = renderMatches(inputText, tokenType);
    assert.strictEqual(renderedMatches, "A AB-AC B ab.AB");
  });
});
