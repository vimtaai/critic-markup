const { parse, render } = require("./index");

const inputs = [
  `Don't go around saying{-- to people that--} the world owes you a living. The world owes you nothing. It was here first. {~~One~>Only one~~} thing is impossible for God: To find {++any++} sense in any copyright law on the planet. {==Truth is stranger than fiction==}{>>strange but true<<}, but it is because Fiction is obliged to stick to possibilities; Truth isn't.`
];

test("Complex example should parse properly", function() {
  const input = inputs[0];
  const expectedOutput = [
    { type: "deletion", start: 22, end: 43, length: 21, content: [" to people that"] },
    { type: "substitution", start: 120, end: 139, length: 19, content: ["One", "Only one"] },
    { type: "addition", start: 177, end: 186, length: 9, content: ["any"] },
    {
      type: "highlight",
      start: 229,
      end: 287,
      length: 58,
      content: ["Truth is stranger than fiction", "strange but true"]
    }
  ];

  expect(parse(input)).toEqual(expectedOutput);
});

test("Complex example should render properly", function() {
  const input = inputs[0];
  const expectedOutput = `Don't go around saying<del> to people that</del> the world owes you a living. The world owes you nothing. It was here first. <del>One</del><ins>Only one</ins> thing is impossible for God: To find <ins>any</ins> sense in any copyright law on the planet. <mark>Truth is stranger than fiction</mark><span class="critic comment">strange but true</span>, but it is because Fiction is obliged to stick to possibilities; Truth isn't.`;

  expect(render(input)).toBe(expectedOutput);
});
