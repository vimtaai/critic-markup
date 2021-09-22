import { comment } from "./comment.js";

const highlightRegex = new RegExp(/\{==(?<highlight>.*?)==\}\{>>(?<comment>.*?)<<\}/, "gs");

function validateHighlight() {
  return true;
}

function annotateHighlight(token) {
  return { type: "highlight", ...token };
}

function renderHighlight(token) {
  return `<mark>${token.content.highlight}</mark>${comment.render(token)}`;
}

export const highlight = {
  regex: highlightRegex,
  validate: validateHighlight,
  annotate: annotateHighlight,
  render: renderHighlight
};
