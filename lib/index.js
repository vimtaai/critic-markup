import { addition } from "./syntax/addition.js";
import { comment } from "./syntax/comment.js";
import { deletion } from "./syntax/deletion.js";
import { highlight } from "./syntax/highlight.js";
import { substitution } from "./syntax/substitution.js";

import { parseMatches } from "./utils/parse-matches.js";
import { renderMatches } from "./utils/render-matches.js";

function compareTokens(firstToken, secondToken) {
  return firstToken.start - secondToken.start;
}

export function parse(inputText) {
  return [
    ...parseMatches(inputText, substitution),
    ...parseMatches(inputText, addition),
    ...parseMatches(inputText, deletion),
    ...parseMatches(inputText, highlight),
    ...parseMatches(inputText, comment),
  ].sort(compareTokens);
}

export function render(inputText, options = {}) {
  let renderedText = inputText;

  renderedText = renderMatches(renderedText, substitution, options);
  renderedText = renderMatches(renderedText, addition, options);
  renderedText = renderMatches(renderedText, deletion, options);
  renderedText = renderMatches(renderedText, highlight, options);
  renderedText = renderMatches(renderedText, comment, options);

  return renderedText;
}
