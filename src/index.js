const { matchAll } = require("./utils/match-all");
const { addition } = require("./syntax/addition");
const { deletion } = require("./syntax/deletion");
const { substitution } = require("./syntax/substitution");
const { comment } = require("./syntax/comment");
const { highlight } = require("./syntax/highlight");

function matchSortComparator(match1, match2) {
  return match1.start - match2.start;
}

function parse(text) {
  const substitutions = matchAll(text, substitution).map(substitution.annotate);
  const additions = matchAll(text, addition).map(addition.annotate);
  const deletions = matchAll(text, deletion).map(deletion.annotate);
  const highlights = matchAll(text, highlight).map(highlight.annotate);
  const comments = matchAll(text, comment).map(comment.annotate);

  const allMatches = [...substitutions, ...additions, ...deletions, ...highlights, ...comments];
  return allMatches.sort(matchSortComparator);
}

function render(text) {
  return text
    .replace(substitution.regex, substitution.render)
    .replace(addition.regex, addition.render)
    .replace(deletion.regex, deletion.render)
    .replace(highlight.regex, highlight.render)
    .replace(comment.regex, comment.render);
}

module.exports = { parse, render };
