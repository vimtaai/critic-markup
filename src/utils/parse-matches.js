function createTokenFromExecMatch(match) {
  const matchedText = match[0];
  const content = { ...match.groups };

  return {
    inputText: match.input,
    matchedText,
    start: match.index,
    end: match.index + matchedText.length,
    length: matchedText.length,
    content
  };
}

export function parseMatches(inputText, tokenType) {
  return [...inputText.matchAll(tokenType.regex)]
    .map(createTokenFromExecMatch)
    .filter(tokenType.validate)
    .map(tokenType.annotate);
}
