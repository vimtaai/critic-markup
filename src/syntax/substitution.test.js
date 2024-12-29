import { strict as assert } from "node:assert";
import { describe, it } from "node:test";

import { parseMatches } from "../utils/parse-matches.js";
import { renderMatches } from "../utils/render-matches.js";

import { substitution } from "./substitution.js";

describe("substitution", () => {
  it("should parse inline properly", () => {
    const input = "Lorem {~~hipsum~>ipsum~~} dolor…";
    const expectedOutput = [
      {
        type: "substitution",
        inputText: "Lorem {~~hipsum~>ipsum~~} dolor…",
        matchedText: "{~~hipsum~>ipsum~~}",
        start: 6,
        end: 25,
        length: 19,
        content: { deletion: "hipsum", addition: "ipsum" }
      }
    ];

    const parsedMatches = parseMatches(input, substitution);
    assert.deepStrictEqual(parsedMatches, expectedOutput);
  });

  it("should render inline properly", () => {
    const input = "Lorem {~~hipsum~>ipsum~~} dolor…";
    const expectedOutput = `Lorem <del>hipsum</del><ins>ipsum</ins> dolor…`;

    const renderedMatches = renderMatches(input, substitution);
    assert.strictEqual(renderedMatches, expectedOutput);
  });

  it("should parse between paragraphs properly", () => {
    const input = "Lorem ipsum {~~dolor~>\n\n~~}…";
    const expectedOutput = [
      {
        type: "substitution",
        inputText: "Lorem ipsum {~~dolor~>\n\n~~}…",
        matchedText: "{~~dolor~>\n\n~~}",
        start: 12,
        end: 27,
        length: 15,
        content: { deletion: "dolor", addition: "\n\n" }
      }
    ];

    const parsedMatches = parseMatches(input, substitution);
    assert.deepStrictEqual(parsedMatches, expectedOutput);
  });

  it("should render between paragraphs properly", () => {
    const input = "Lorem ipsum {~~dolor~>\n\n~~}…";
    const expectedOutput = `Lorem ipsum <del>dolor</del>\n\n<ins class="break">&nbsp;</ins>\n\n…`;

    const renderedMatches = renderMatches(input, substitution);
    assert.strictEqual(renderedMatches, expectedOutput);
  });
});
