import { expect } from "chai";

import { parseMatches } from "../utils/parse-matches.js";
import { renderMatches } from "../utils/render-matches.js";

import { addition } from "./addition.js";

describe("addition", () => {
  it("should parse inline properly", () => {
    const input = `Lorem ipsum dolor{++ sit++} amet…`;
    const expectedOutput = [
      {
        type: "addition",
        inputText: "Lorem ipsum dolor{++ sit++} amet…",
        matchedText: "{++ sit++}",
        start: 17,
        end: 27,
        length: 10,
        content: { addition: " sit" }
      }
    ];

    expect(parseMatches(input, addition)).to.deep.equal(expectedOutput);
  });

  it("should render inline properly", () => {
    const input = `Lorem ipsum dolor{++ sit++} amet…`;
    const expectedOutput = `Lorem ipsum dolor<ins> sit</ins> amet…`;

    expect(renderMatches(input, addition)).to.equal(expectedOutput);
  });

  it("should parse added paragraph properly", () => {
    const input = `Lorem ipsum dolor{++\n\n++}sit amet…`;
    const expectedOutput = [
      {
        type: "addition",
        inputText: "Lorem ipsum dolor{++\n\n++}sit amet…",
        matchedText: "{++\n\n++}",
        start: 17,
        end: 25,
        length: 8,
        content: { addition: "\n\n" }
      }
    ];

    expect(parseMatches(input, addition)).to.deep.equal(expectedOutput);
  });

  it("should render added paragraph properly", () => {
    const input = `Lorem ipsum dolor{++\n\n++}sit amet…`;
    const expectedOutput = `Lorem ipsum dolor\n\n<ins class="break">&nbsp;</ins>\n\nsit amet…`;

    expect(renderMatches(input, addition)).to.equal(expectedOutput);
  });
});
