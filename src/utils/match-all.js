function createMatchDescriptor(match) {
  const content = [match[1] || match[0]];

  if (match[2]) {
    content.push(match[2]);
  }

  return {
    start: match.index,
    end: match.index + match[0].length,
    length: match[0].length,
    content
  };
}

function matchAll(str, regex) {
  const regexClone = new RegExp(regex, "gs");
  const results = [];

  let match;
  while ((match = regexClone.exec(str))) {
    const matchDescriptor = createMatchDescriptor(match);
    results.push(matchDescriptor);
  }

  return results;
}

module.exports = { matchAll };
