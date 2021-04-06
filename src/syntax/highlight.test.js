import { expect } from "chai";

import { matchAll } from "../utils/match-all.js";
import { highlight } from "./highlight.js";

const inputs = [
  `Lorem ipsum dolor sit amet, consectetur adipiscing elit. {==Vestibulum at orci magna. Phasellus augue justo, sodales eu pulvinar ac, vulputate eget nulla.==}{>>confusing<<} Mauris massa sem, tempor sed cursus et, semper tincidunt lacus.`
];

describe("highlight", function () {
  it("should parse inline properly", function () {
    const input = inputs[0];
    const expectedContent = [
      "Vestibulum at orci magna. Phasellus augue justo, sodales eu pulvinar ac, vulputate eget nulla.",
      "confusing"
    ];
    const expectedOutput = [
      { type: "highlight", start: 57, end: 172, length: 115, content: expectedContent }
    ];

    expect(matchAll(input, highlight).map(highlight.annotate)).to.deep.equal(expectedOutput);
  });

  it("should render inline properly", function () {
    const input = inputs[0];
    const expectedOutput = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. <mark>Vestibulum at orci magna. Phasellus augue justo, sodales eu pulvinar ac, vulputate eget nulla.</mark><span class="critic comment">confusing</span> Mauris massa sem, tempor sed cursus et, semper tincidunt lacus.`;

    expect(input.replace(highlight.regex, highlight.render)).to.equal(expectedOutput);
  });
});
