const { matchAll } = require("./match-all");

const inputs = ["Lorem ipsum dolor sit isupm amet..."];
const syntaxDescriptors = {
  basic: { validate: () => true, regex: / i.+?m / },
  withCaptureGroup: { validate: () => true, regex: / (i.+?m) / },
  withValidate: { validate: match => match[0] !== " ipsum ", regex: / i.+?m / },
  withCaptureGroupAndValidate: { validate: match => match[0] !== " ipsum ", regex: / (i.+?m) / }
};

test("`matchAll` should return the proper number of matches", function() {
  const input = inputs[0];
  const expectedOutput = 2;

  const output = matchAll(input, syntaxDescriptors.basic);
  expect(output.length).toEqual(expectedOutput);
});

test("`matchAll` should return the first matching occurence", function() {
  const input = inputs[0];
  const expectedOutput = { start: 5, end: 12, length: 7, content: [" ipsum "] };

  const output = matchAll(input, syntaxDescriptors.basic);
  expect(output[0]).toEqual(expectedOutput);
});

test("`matchAll` should return the first matching occurence with a capture group", function() {
  const input = inputs[0];
  const expectedOutput = { start: 5, end: 12, length: 7, content: ["ipsum"] };

  const output = matchAll(input, syntaxDescriptors.withCaptureGroup);
  expect(output[0]).toEqual(expectedOutput);
});

test("`matchAll` should return all matching occurences with a capture group", function() {
  const input = inputs[0];
  const expectedOutput = [
    { start: 5, end: 12, length: 7, content: ["ipsum"] },
    { start: 21, end: 28, length: 7, content: ["isupm"] }
  ];

  const output = matchAll(input, syntaxDescriptors.withCaptureGroup);
  for (let i = 0; i < output.length; i++) {
    expect(output[i]).toEqual(expectedOutput[i]);
  }
});

test("`matchAll` should return all matching occurences with a `validate` method", function() {
  const input = inputs[0];
  const expectedOutput = [{ start: 21, end: 28, length: 7, content: [" isupm "] }];

  const output = matchAll(input, syntaxDescriptors.withValidate);
  for (let i = 0; i < output.length; i++) {
    expect(output[i]).toEqual(expectedOutput[i]);
  }
});

test("`matchAll` should return all matching occurences with a capture group and a `validate` method", function() {
  const input = inputs[0];
  const expectedOutput = [{ start: 21, end: 28, length: 7, content: ["isupm"] }];

  const output = matchAll(input, syntaxDescriptors.withCaptureGroupAndValidate);
  for (let i = 0; i < output.length; i++) {
    expect(output[i]).toEqual(expectedOutput[i]);
  }
});
