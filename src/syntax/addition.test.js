const { matchAll } = require("../utils/match-all");
const { addition } = require("./addition");

const inputs = [
  `Lorem ipsum dolor{++ sit++} amet…`,
  `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum at orci magna. Phasellus augue justo, sodales eu pulvinar ac, vulputate eget nulla. Mauris massa sem, tempor sed cursus et, semper tincidunt lacus.{++\n\n++}Praesent sagittis, quam id egestas consequat, nisl orci vehicula libero, quis ultricies nulla magna interdum sem. Maecenas eget orci vitae eros accumsan mollis. Cras mi mi, rutrum id aliquam in, aliquet vitae tellus. Sed neque justo, cursus in commodo eget, facilisis eget nunc. Cras tincidunt auctor varius.`
];

test("Addition should parse inline properly", function() {
  const input = inputs[0];
  const expectedContent = [" sit"];
  const expectedOutput = [
    { type: "addition", start: 17, end: 27, length: 10, content: expectedContent }
  ];

  expect(matchAll(input, addition.regex).map(addition.annotate)).toEqual(expectedOutput);
});

test("Addition should render inline properly", function() {
  const input = inputs[0];
  const expectedOutput = `Lorem ipsum dolor<ins> sit</ins> amet…`;

  expect(input.replace(addition.regex, addition.render)).toBe(expectedOutput);
});

test("Addition should parse added paragraph properly", function() {
  const input = inputs[1];
  const expectedContent = ["\n\n"];
  const expectedOutput = [
    { type: "addition", start: 215, end: 223, length: 8, content: expectedContent }
  ];

  expect(matchAll(input, addition.regex).map(addition.annotate)).toEqual(expectedOutput);
});

test("Addition should render added paragraph properly", function() {
  const input = inputs[1];
  const expectedOutput = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum at orci magna. Phasellus augue justo, sodales eu pulvinar ac, vulputate eget nulla. Mauris massa sem, tempor sed cursus et, semper tincidunt lacus.\n\n<ins class="break">&nbsp;</ins>\n\nPraesent sagittis, quam id egestas consequat, nisl orci vehicula libero, quis ultricies nulla magna interdum sem. Maecenas eget orci vitae eros accumsan mollis. Cras mi mi, rutrum id aliquam in, aliquet vitae tellus. Sed neque justo, cursus in commodo eget, facilisis eget nunc. Cras tincidunt auctor varius.`;

  expect(input.replace(addition.regex, addition.render)).toBe(expectedOutput);
});
