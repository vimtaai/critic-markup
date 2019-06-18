import { matchAll } from "../utils/match-all";
import { comment } from "./comment";

const inputs = [`Lorem ipsum dolor sit amet.{>>This is a comment<<}`];

test("Comment should parse inline properly", function() {
  const input = inputs[0];
  const expectedContent = ["This is a comment"];
  const expectedOutput = [
    { type: "comment", start: 27, end: 50, length: 23, content: expectedContent }
  ];

  expect(matchAll(input, comment).map(comment.annotate)).toEqual(expectedOutput);
});

test("Comment should render inline properly", function() {
  const input = inputs[0];
  const expectedOutput = `Lorem ipsum dolor sit amet.<span class="critic comment">This is a comment</span>`;
  expect(input.replace(comment.regex, comment.render)).toBe(expectedOutput);
});
