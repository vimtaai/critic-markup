import { expect } from "chai";

import { matchAll } from "../utils/match-all.js";
import { comment } from "./comment.js";

const inputs = [`Lorem ipsum dolor sit amet.{>>This is a comment<<}`];

describe("comment", function () {
  it("should parse inline properly", function () {
    const input = inputs[0];
    const expectedContent = ["This is a comment"];
    const expectedOutput = [
      { type: "comment", start: 27, end: 50, length: 23, content: expectedContent }
    ];

    expect(matchAll(input, comment).map(comment.annotate)).to.deep.equal(expectedOutput);
  });

  it("should render inline properly", function () {
    const input = inputs[0];
    const expectedOutput = `Lorem ipsum dolor sit amet.<span class="critic comment">This is a comment</span>`;
    expect(input.replace(comment.regex, comment.render)).to.equal(expectedOutput);
  });
});
