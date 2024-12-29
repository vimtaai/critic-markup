const additionRegex = new RegExp(/\{\+\+(?<addition>.*?)\+\+\}/, "gs");

function validateAddition() {
  return true;
}

function annotateAddition(token) {
  return { type: "addition", ...token };
}

function renderAddition(token) {
  if (token.content.addition.trim() === "") {
    return `\n\n<ins class="break">&nbsp;</ins>\n\n`;
  }

  return `<ins>${token.content.addition}</ins>`;
}

export const addition = {
  regex: additionRegex,
  validate: validateAddition,
  annotate: annotateAddition,
  render: renderAddition,
};
