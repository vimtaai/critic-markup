import { escapeHtml } from "../utils/escape-html.js";

const deletionRegex = new RegExp(/\{--(?<deletion>.*?)--\}/, "gs");

function validateDeletion() {
  return true;
}

function annotateDeletion(token) {
  return { type: "deletion", ...token };
}

function renderDeletion(token, options = {}) {
  const shouldEscape = options?.escape ?? true;

  if (token.content.deletion.trim() === "") {
    return `<del>&nbsp;</del> `;
  }

  const content = shouldEscape ? escapeHtml(token.content.deletion) : token.content.deletion;

  return `<del>${content}</del>`;
}

export const deletion = {
  regex: deletionRegex,
  validate: validateDeletion,
  annotate: annotateDeletion,
  render: renderDeletion,
};
