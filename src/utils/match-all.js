function createMatchDescriptor(match) {
  return {
    start: match.index,
    end: match.index + match[0].length,
    length: match[0].length,
    content: match[1] || match[0]
  };
}

function matchAll(str, regex) {
  const regexClone = new RegExp(regex, "g");
  const results = [];

  let match;
  while ((match = regexClone.exec(str))) {
    const matchDescriptor = createMatchDescriptor(match);
    results.push(matchDescriptor);
  }

  return results;
}

module.exports = { matchAll };
