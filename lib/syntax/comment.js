const commentRegex = new RegExp(/\{>>(?<comment>.*?)<<\}/, "gs");

function validateComment(token) {
  return !token.inputText.slice(0, token.start).endsWith("==}");
}

function annotateComment(token) {
  return { type: "comment", ...token };
}

function renderComment(token) {
  return `<span class="critic comment">${token.content.comment}</span>`;
}

export const comment = {
  regex: commentRegex,
  validate: validateComment,
  annotate: annotateComment,
  render: renderComment,
};
