import { matchAll } from "./utils/match-all.js";
import { addition } from "./syntax/addition.js";
import { deletion } from "./syntax/deletion.js";
import { substitution } from "./syntax/substitution.js";
import { comment } from "./syntax/comment.js";
import { highlight } from "./syntax/highlight.js";

function matchSortComparator(match1, match2) {
  return match1.start - match2.start;
}

export function parse(text) {
  const substitutions = matchAll(text, substitution).map(substitution.annotate);
  const additions = matchAll(text, addition).map(addition.annotate);
  const deletions = matchAll(text, deletion).map(deletion.annotate);
  const highlights = matchAll(text, highlight).map(highlight.annotate);
  const comments = matchAll(text, comment).map(comment.annotate);

  const allMatches = [...substitutions, ...additions, ...deletions, ...highlights, ...comments];
  return allMatches.sort(matchSortComparator);
}

export function render(text) {
  return text
    .replace(substitution.regex, substitution.render)
    .replace(addition.regex, addition.render)
    .replace(deletion.regex, deletion.render)
    .replace(highlight.regex, highlight.render)
    .replace(comment.regex, comment.render);
}
