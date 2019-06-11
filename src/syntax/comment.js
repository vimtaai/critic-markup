const comment = {
  regex: /(?<!==\})\{>>(.*?)<<\}/gs,
  regexOffset: 3,
  annotate(match) {
    return { type: "comment", ...match };
  },
  render(_, match) {
    return `<span class="critic comment">${match}</span>`;
  }
};

module.exports = { comment };
