export const deletion = {
  regex: /\{--(.*?)--\}/gs,
  validate: () => true,
  annotate(match) {
    return { type: "deletion", ...match };
  },
  render(_, match) {
    if (match.trim() === "") {
      return `<del>&nbsp;</del> `;
    }

    return `<del>${match}</del>`;
  }
};
