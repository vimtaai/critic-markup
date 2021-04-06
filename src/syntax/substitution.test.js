import { matchAll } from "../utils/match-all";
import { substitution } from "./substitution";

const inputs = [
  `Lorem {~~hipsum~>ipsum~~} dolor sit amet…`,
  `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum at orci magna. Phasellus augue justo, sodales eu pulvinar ac, vulputate eget nulla. {~~Mauris massa sem, tempor sed cursus et, semper tincidunt lacus.~>\n\n~~}Praesent sagittis, quam id egestas consequat, nisl orci vehicula libero, quis ultricies nulla magna interdum sem. Maecenas eget orci vitae eros accumsan mollis. Cras mi mi, rutrum id aliquam in, aliquet vitae tellus. Sed neque justo, cursus in commodo eget, facilisis eget nunc. Cras tincidunt auctor varius.`,
];

test("Substitution should parse inline properly", function () {
  const input = inputs[0];
  const expectedContent = ["hipsum", "ipsum"];
  const expectedOutput = [
    { type: "substitution", start: 6, end: 25, length: 19, content: expectedContent },
  ];

  expect(matchAll(input, substitution).map(substitution.annotate)).toEqual(expectedOutput);
});

test("Substitution should render inline properly", function () {
  const input = inputs[0];
  const expectedOutput = `Lorem <del>hipsum</del><ins>ipsum</ins> dolor sit amet…`;
  expect(input.replace(substitution.regex, substitution.render)).toBe(expectedOutput);
});

test("Substitution should parse between paragraphs properly", function () {
  const input = inputs[1];
  const expectedContent = [
    "Mauris massa sem, tempor sed cursus et, semper tincidunt lacus.",
    "\n\n",
  ];
  const expectedOutput = [
    { type: "substitution", start: 152, end: 225, length: 73, content: expectedContent },
  ];

  expect(matchAll(input, substitution).map(substitution.annotate)).toEqual(expectedOutput);
});

test("Substitution should render between paragraphs properly", function () {
  const input = inputs[1];
  const expectedOutput = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum at orci magna. Phasellus augue justo, sodales eu pulvinar ac, vulputate eget nulla. <del>Mauris massa sem, tempor sed cursus et, semper tincidunt lacus.</del><ins class="break">&nbsp;</ins>\n\nPraesent sagittis, quam id egestas consequat, nisl orci vehicula libero, quis ultricies nulla magna interdum sem. Maecenas eget orci vitae eros accumsan mollis. Cras mi mi, rutrum id aliquam in, aliquet vitae tellus. Sed neque justo, cursus in commodo eget, facilisis eget nunc. Cras tincidunt auctor varius.`;
  expect(input.replace(substitution.regex, substitution.render)).toBe(expectedOutput);
});
