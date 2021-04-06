function createMatchDescriptor(match) {
  const content = [match[1] || match[0]];

  if (match[2]) {
    content.push(match[2]);
  }

  return {
    start: match.index,
    end: match.index + match[0].length,
    length: match[0].length,
    content,
  };
}

export function matchAll(str, syntaxDescriptor) {
  const regexClone = new RegExp(syntaxDescriptor.regex, "gs");
  const results = [];

  let match;
  while ((match = regexClone.exec(str))) {
    if (!syntaxDescriptor.validate(match)) {
      continue;
    }

    const matchDescriptor = createMatchDescriptor(match);
    results.push(matchDescriptor);
  }

  return results;
}
