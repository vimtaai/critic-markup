const deletionRegex = new RegExp(/\{--(?<deletion>.*?)--\}/, "gs");

function validateDeletion() {
  return true;
}

function annotateDeletion(token) {
  return { type: "deletion", ...token };
}

function renderDeletion(token) {
  if (token.content.deletion.trim() === "") {
    return `<del>&nbsp;</del> `;
  }

  return `<del>${token.content.deletion}</del>`;
}

export const deletion = {
  regex: deletionRegex,
  validate: validateDeletion,
  annotate: annotateDeletion,
  render: renderDeletion
};
