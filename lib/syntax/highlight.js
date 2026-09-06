import { escapeHtml } from "../utils/escape-html.js";
import { comment } from "./comment.js";

const highlightRegex = new RegExp(/\{==(?<highlight>.*?)==\}(?:\{>>(?<comment>.*?)<<\})?/, "gs");

function validateHighlight() {
  return true;
}

function annotateHighlight(token) {
  return { type: "highlight", ...token };
}

function renderHighlight(token, options = {}) {
  const shouldEscape = options?.escape ?? true;
  const highlightContent = shouldEscape
    ? escapeHtml(token.content.highlight)
    : token.content.highlight;
  const highlightHtml = `<mark>${highlightContent}</mark>`;
  const commentHtml = token.content.comment === undefined ? "" : comment.render(token, options);

  return `${highlightHtml}${commentHtml}`;
}

export const highlight = {
  regex: highlightRegex,
  validate: validateHighlight,
  annotate: annotateHighlight,
  render: renderHighlight,
};
