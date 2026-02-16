import { addition } from "./addition.js";
import { deletion } from "./deletion.js";

const substitutionRegex = new RegExp(/\{~~(?<deletion>.*?)~>(?<addition>.*?)~~\}/, "gs");

function validateSubstitution() {
  return true;
}

function annotateSubstitution(token) {
  return { type: "substitution", ...token };
}

function renderSubstitution(token) {
  return `${deletion.render(token)}${addition.render(token)}`;
}

export const substitution = {
  regex: substitutionRegex,
  validate: validateSubstitution,
  annotate: annotateSubstitution,
  render: renderSubstitution,
};
