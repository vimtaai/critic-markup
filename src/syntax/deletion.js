const deletion = {
  regex: /\{--(.*?)--\}/gs,
  render(_, match) {
    if (match.trim() === "") {
      return `<del>&nbsp;</del> `;
    }

    return `<del>${match}</del>`;
  }
};

module.exports = { deletion };
