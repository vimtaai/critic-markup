import { parseMatches } from "./utils/parse-matches.js";
import { renderMatches } from "./utils/render-matches.js";

import { addition } from "./syntax/addition.js";
import { comment } from "./syntax/comment.js";
import { deletion } from "./syntax/deletion.js";
import { highlight } from "./syntax/highlight.js";
import { substitution } from "./syntax/substitution.js";

function compareTokens(firstToken, secondToken) {
  return firstToken.start - secondToken.start;
}

export function parse(inputText) {
  return [
    ...parseMatches(inputText, substitution),
    ...parseMatches(inputText, addition),
    ...parseMatches(inputText, deletion),
    ...parseMatches(inputText, highlight),
    ...parseMatches(inputText, comment)
  ].sort(compareTokens);
}

export function render(inputText) {
  let renderedText = inputText;

  renderedText = renderMatches(renderedText, substitution);
  renderedText = renderMatches(renderedText, addition);
  renderedText = renderMatches(renderedText, deletion);
  renderedText = renderMatches(renderedText, highlight);
  renderedText = renderMatches(renderedText, comment);

  return renderedText;
}
