function createTokenFromReplaceMatch(match) {
  const matchCopy = [...match];

  const matchedText = matchCopy[0];
  const content = matchCopy.pop() || {};
  const inputText = matchCopy.pop();
  const start = matchCopy.pop();

  return {
    inputText,
    matchedText,
    start,
    end: start + matchedText.length,
    length: matchedText.length,
    content
  };
}

export function renderMatches(inputText, tokenType) {
  function replaceMatch(...match) {
    const token = createTokenFromReplaceMatch(match);

    if (!tokenType.validate(token)) {
      return token.matchedText;
    }

    return tokenType.render(token);
  }

  return inputText.replace(tokenType.regex, replaceMatch);
}
