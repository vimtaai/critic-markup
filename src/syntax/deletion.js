const deletion = {
  regex: /\{--(.*?)--\}/gs,
  regexOffset: 0,
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

module.exports = { deletion };
