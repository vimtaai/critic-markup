import { expect } from "chai";

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

    expect(parseMatches(input, substitution)).to.deep.equal(expectedOutput);
  });

  it("should render inline properly", () => {
    const input = "Lorem {~~hipsum~>ipsum~~} dolor…";
    const expectedOutput = `Lorem <del>hipsum</del><ins>ipsum</ins> dolor…`;

    expect(renderMatches(input, substitution)).to.deep.equal(expectedOutput);
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

    expect(parseMatches(input, substitution)).to.deep.equal(expectedOutput);
  });

  it("should render between paragraphs properly", () => {
    const input = "Lorem ipsum {~~dolor~>\n\n~~}…";
    const expectedOutput = `Lorem ipsum <del>dolor</del>\n\n<ins class="break">&nbsp;</ins>\n\n…`;

    expect(renderMatches(input, substitution)).to.equal(expectedOutput);
  });
});
