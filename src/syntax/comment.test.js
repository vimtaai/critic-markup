import { expect } from "chai";

import { parseMatches } from "../utils/parse-matches.js";
import { renderMatches } from "../utils/render-matches.js";

import { comment } from "./comment.js";

describe("comment", () => {
  it("should parse properly", () => {
    const input = `Lorem ipsum dolor sit {>>comment<<}.`;
    const expectedOutput = [
      {
        type: "comment",
        inputText: "Lorem ipsum dolor sit {>>comment<<}.",
        matchedText: "{>>comment<<}",
        start: 22,
        end: 35,
        length: 13,
        content: { comment: "comment" }
      }
    ];

    expect(parseMatches(input, comment)).to.deep.equal(expectedOutput);
  });

  it("should render properly", () => {
    const input = `Lorem ipsum dolor sit {>>comment<<}.`;
    const expectedOutput = `Lorem ipsum dolor sit <span class="critic comment">comment</span>.`;

    expect(renderMatches(input, comment)).to.equal(expectedOutput);
  });

  it("should ignore comments that are actually highlights", () => {
    const input = `Lorem ipsum dolor {==sit ==}{>>comment<<}.`;

    expect(parseMatches(input, comment)).to.deep.equal([]);
  });
});
