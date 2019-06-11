function matchAll(str, regex, fn = x => x) {
  const regexClone = new RegExp(regex, "g");
  const results = [];
  let match;
  do {
    match = regexClone.exec(str);
    if (match) {
      const matchDescriptor = {
        start: match.index,
        end: match.index + match[0].length,
        length: match[0].length,
        content: match[1]
      };
      results.push(fn(matchDescriptor));
    }
  } while (match);
  return results;
}

module.exports = { matchAll };
