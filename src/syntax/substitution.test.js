const { substitution } = require("./substitution");

test("Substitution should render inline properly", function() {
  const input = `Lorem {~~hipsum~>ipsum~~} dolor sit amet…`;
  const expectedOutput = `Lorem <del>hipsum</del><ins>ipsum</ins> dolor sit amet…`;
  expect(input.replace(substitution.regex, substitution.render)).toBe(
    expectedOutput
  );
});
