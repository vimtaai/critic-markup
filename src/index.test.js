import { strict as assert } from "node:assert";
import { describe, it } from "node:test";

import { parse, render } from "./index.js";

const input =
  `Don't go around saying{-- to people that--} the world owes you a living. The world ` +
  `owes you nothing. It was here first. {~~One~>Only one~~} thing is impossible for ` +
  `God: To find {++any++} sense in any copyright law on the planet. {==Truth is ` +
  `stranger than fiction==}{>>strange but true<<}, but it is because Fiction is ` +
  `obliged to stick to possibilities; Truth isn't.`;

describe("complex example", () => {
  it("should parse properly", () => {
    const expectedOutput = [
      {
        type: "deletion",
        inputText: input,
        matchedText: "{-- to people that--}",
        start: 22,
        end: 43,
        length: 21,
        content: { deletion: " to people that" },
      },
      {
        type: "substitution",
        inputText: input,
        matchedText: "{~~One~>Only one~~}",
        start: 120,
        end: 139,
        length: 19,
        content: { deletion: "One", addition: "Only one" },
      },
      {
        type: "addition",
        inputText: input,
        matchedText: "{++any++}",
        start: 177,
        end: 186,
        length: 9,
        content: { addition: "any" },
      },
      {
        type: "highlight",
        inputText: input,
        matchedText: "{==Truth is stranger than fiction==}{>>strange but true<<}",
        start: 229,
        end: 287,
        length: 58,
        content: { highlight: "Truth is stranger than fiction", comment: "strange but true" },
      },
    ];

    const parsedInput = parse(input);
    assert.deepStrictEqual(parsedInput, expectedOutput);
  });

  it("should render properly", () => {
    const expectedRenderedOutput =
      `Don't go around saying<del> to people that</del> the world owes you a living. The ` +
      `world owes you nothing. It was here first. <del>One</del><ins>Only one</ins> thing ` +
      `is impossible for God: To find <ins>any</ins> sense in any copyright law on the ` +
      `planet. <mark>Truth is stranger than fiction</mark><span class="critic ` +
      `comment">strange but true</span>, but it is because Fiction is obliged to stick to ` +
      `possibilities; Truth isn't.`;

    const renderedInput = render(input);
    assert.strictEqual(renderedInput, expectedRenderedOutput);
  });
});
