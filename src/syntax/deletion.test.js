import { matchAll } from "../utils/match-all";
import { deletion } from "./deletion";

const inputs = [
  `Lorem{-- ipsum--} dolor sit amet…`,
  `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum at orci magna. Phasellus augue justo, sodales eu pulvinar ac, vulputate eget nulla. Mauris massa sem, tempor sed cursus et, semper tincidunt lacus.{--\n\n--}Praesent sagittis, quam id egestas consequat, nisl orci vehicula libero, quis ultricies nulla magna interdum sem. Maecenas eget orci vitae eros accumsan mollis. Cras mi mi, rutrum id aliquam in, aliquet vitae tellus. Sed neque justo, cursus in commodo eget, facilisis eget nunc. Cras tincidunt auctor varius.`,
];

test("Deletion should parse inline properly", function () {
  const input = inputs[0];
  const expectedContent = [" ipsum"];
  const expectedOutput = [
    { type: "deletion", start: 5, end: 17, length: 12, content: expectedContent },
  ];

  expect(matchAll(input, deletion).map(deletion.annotate)).toEqual(expectedOutput);
});

test("Deletion should render inline properly", function () {
  const input = inputs[0];
  const expectedOutput = `Lorem<del> ipsum</del> dolor sit amet…`;

  expect(input.replace(deletion.regex, deletion.render)).toBe(expectedOutput);
});

test("Deletion should parse added paragraph properly", function () {
  const input = inputs[1];
  const expectedContent = ["\n\n"];
  const expectedOutput = [
    { type: "deletion", start: 215, end: 223, length: 8, content: expectedContent },
  ];

  expect(matchAll(input, deletion).map(deletion.annotate)).toEqual(expectedOutput);
});

test("Deletion should render deleted paragraph properly", function () {
  const input = inputs[1];
  const expectedOutput = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum at orci magna. Phasellus augue justo, sodales eu pulvinar ac, vulputate eget nulla. Mauris massa sem, tempor sed cursus et, semper tincidunt lacus.<del>&nbsp;</del> Praesent sagittis, quam id egestas consequat, nisl orci vehicula libero, quis ultricies nulla magna interdum sem. Maecenas eget orci vitae eros accumsan mollis. Cras mi mi, rutrum id aliquam in, aliquet vitae tellus. Sed neque justo, cursus in commodo eget, facilisis eget nunc. Cras tincidunt auctor varius.`;

  expect(input.replace(deletion.regex, deletion.render)).toBe(expectedOutput);
});
