const { highlight } = require("./highlight");

test("Highlight should render inline properly", function() {
  const input = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. {==Vestibulum at orci magna. Phasellus augue justo, sodales eu pulvinar ac, vulputate eget nulla.==}{>>confusing<<} Mauris massa sem, tempor sed cursus et, semper tincidunt lacus.`;
  const expectedOutput = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. <mark>Vestibulum at orci magna. Phasellus augue justo, sodales eu pulvinar ac, vulputate eget nulla.</mark><span class="critic comment">confusing</span> Mauris massa sem, tempor sed cursus et, semper tincidunt lacus.`;
  expect(input.replace(highlight.regex, highlight.render)).toBe(expectedOutput);
});
