const { comment } = require("./comment");

test("Comment should render inline properly", function() {
  const input = `Lorem ipsum dolor sit amet.{>>This is a comment<<}`;
  const expectedOutput = `Lorem ipsum dolor sit amet.<span class="critic comment">This is a comment</span>`;
  expect(input.replace(comment.regex, comment.render)).toBe(expectedOutput);
});
