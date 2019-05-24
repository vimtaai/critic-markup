const { addition } = require("./syntax/addition");
const { deletion } = require("./syntax/deletion");
const { substitution } = require("./syntax/substitution");
const { comment } = require("./syntax/comment");
const { highlight } = require("./syntax/highlight");

function renderCriticMarkup(text) {
  return text
    .replace(substitution.regex, substitution.render)
    .replace(addition.regex, addition.render)
    .replace(deletion.regex, deletion.render)
    .replace(highlight.regex, highlight.render)
    .replace(comment.regex, comment.render);
}

module.exports = { renderCriticMarkup };
