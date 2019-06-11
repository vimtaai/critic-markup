const { matchAll } = require("./match-all");

test("`matchAll` should return the proper number of matches", function() {
  const input = "Lorem ipsum dolor sit isupm amet...";
  const regex = /(i.+?m)/;
  const expectedOutput = 2;

  const output = matchAll(input, regex);
  expect(output.length).toEqual(expectedOutput);
});

test("`matchAll` should return the first matching occurence", function() {
  const input = "Lorem ipsum dolor sit ipsum amet...";
  const regex = / (i.+?m) /;
  const expectedOutput = {
    start: 5,
    end: 12,
    length: 7,
    content: "ipsum"
  };

  const output = matchAll(input, regex);
  expect(output[0]).toEqual(expectedOutput);
});

test("`matchAll` sould return all matching occurences", function() {
  const input = "Lorem ipsum dolor sit isupm amet...";
  const regex = / (i.+?m) /;
  const expectedOutput = [
    {
      start: 5,
      end: 12,
      length: 7,
      content: "ipsum"
    },
    {
      start: 21,
      end: 28,
      length: 7,
      content: "isupm"
    }
  ];

  const output = matchAll(input, regex);
  for (let i = 0; i < output.length; i++) {
    expect(output[i]).toEqual(expectedOutput[i]);
  }
});

test("`matchAll` should handle transforming function properly", function() {
  const input = "Lorem ipsum dolor sit isupm amet...";
  const regex = / (i.+?m) /;
  const fn = match => ({ type: "test", ...match });
  const expectedOutput = [
    {
      type: "test",
      start: 5,
      end: 12,
      length: 7,
      content: "ipsum"
    },
    {
      type: "test",
      start: 21,
      end: 28,
      length: 7,
      content: "isupm"
    }
  ];

  const output = matchAll(input, regex, fn);
  for (let i = 0; i < output.length; i++) {
    expect(output[i]).toEqual(expectedOutput[i]);
  }
});
