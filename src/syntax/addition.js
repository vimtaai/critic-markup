const addition = {
  regex: /\{\+\+(.*?)\+\+\}/gs,
  regexOffset: 0,
  annotate(match) {
    return { type: "addition", ...match };
  },
  render(_, match) {
    if (match.trim() === "") {
      return `\n\n<ins class="break">&nbsp;</ins>\n\n`;
    }

    return `<ins>${match}</ins>`;
  }
};

module.exports = { addition };
