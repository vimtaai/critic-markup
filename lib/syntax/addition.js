import { escapeHtml } from "../utils/escape-html.js";

const additionRegex = new RegExp(/\{\+\+(?<addition>.*?)\+\+\}/, "gs");

function validateAddition() {
  return true;
}

function annotateAddition(token) {
  return { type: "addition", ...token };
}

function renderAddition(token, options = {}) {
  const shouldEscape = options?.escape ?? true;

  if (token.content.addition.trim() === "") {
    return `\n\n<ins class="break">&nbsp;</ins>\n\n`;
  }

  const content = shouldEscape ? escapeHtml(token.content.addition) : token.content.addition;

  return `<ins>${content}</ins>`;
}

export const addition = {
  regex: additionRegex,
  validate: validateAddition,
  annotate: annotateAddition,
  render: renderAddition,
};
