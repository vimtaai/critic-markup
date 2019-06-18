const ignorePattern = "==}";

export const comment = {
  regex: /\{>>(.*?)<<\}/gs,
  validate: ({ input, index }) =>
    input.substr(index - ignorePattern.length, ignorePattern.length) !== ignorePattern,
  annotate(match) {
    return { type: "comment", ...match };
  },
  render(_, match) {
    return `<span class="critic comment">${match}</span>`;
  }
};
