import { escapeHtml } from "../utils/escape-html.js";

const commentRegex = new RegExp(/\{>>(?<comment>.*?)<<\}/, "gs");

function validateComment(token) {
  return !token.inputText.slice(0, token.start).endsWith("==}");
}

function annotateComment(token) {
  return { type: "comment", ...token };
}

function renderComment(token, options = {}) {
  const shouldEscape = options?.escape ?? true;
  const content = shouldEscape ? escapeHtml(token.content.comment) : token.content.comment;

  return `<span class="critic comment">${content}</span>`;
}

export const comment = {
  regex: commentRegex,
  validate: validateComment,
  annotate: annotateComment,
  render: renderComment,
};
