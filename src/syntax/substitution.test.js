const { substitution } = require("./substitution");

test("Substitution should render inline properly", function() {
  const input = `Lorem {~~hipsum~>ipsum~~} dolor sit amet…`;
  const expectedOutput = `Lorem <del>hipsum</del><ins>ipsum</ins> dolor sit amet…`;
  expect(input.replace(substitution.regex, substitution.render)).toBe(expectedOutput);
});

test("Addition should render between paragraphs properly", function() {
  const input = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum at orci magna. Phasellus augue justo, sodales eu pulvinar ac, vulputate eget nulla. {~~Mauris massa sem, tempor sed cursus et, semper tincidunt lacus.~>\n\n~~}Praesent sagittis, quam id egestas consequat, nisl orci vehicula libero, quis ultricies nulla magna interdum sem. Maecenas eget orci vitae eros accumsan mollis. Cras mi mi, rutrum id aliquam in, aliquet vitae tellus. Sed neque justo, cursus in commodo eget, facilisis eget nunc. Cras tincidunt auctor varius.`;
  const expectedOutput = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum at orci magna. Phasellus augue justo, sodales eu pulvinar ac, vulputate eget nulla. <del>Mauris massa sem, tempor sed cursus et, semper tincidunt lacus.</del><ins class="break">&nbsp;</ins>\n\nPraesent sagittis, quam id egestas consequat, nisl orci vehicula libero, quis ultricies nulla magna interdum sem. Maecenas eget orci vitae eros accumsan mollis. Cras mi mi, rutrum id aliquam in, aliquet vitae tellus. Sed neque justo, cursus in commodo eget, facilisis eget nunc. Cras tincidunt auctor varius.`;
  expect(input.replace(substitution.regex, substitution.render)).toBe(expectedOutput);
});
