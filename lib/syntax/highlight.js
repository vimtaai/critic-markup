import { comment } from "./comment.js";

const highlightRegex = new RegExp(/\{==(?<highlight>.*?)==\}(?:\{>>(?<comment>.*?)<<\})?/, "gs");

function validateHighlight() {
  return true;
}

function annotateHighlight(token) {
  return { type: "highlight", ...token };
}

function renderHighlight(token) {
  const highlightHtml = `<mark>${token.content.highlight}</mark>`;
  const commentHtml = token.content.comment === undefined ? "" : comment.render(token);

  return `${highlightHtml}${commentHtml}`;
}

export const highlight = {
  regex: highlightRegex,
  validate: validateHighlight,
  annotate: annotateHighlight,
  render: renderHighlight,
};
