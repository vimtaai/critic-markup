const addition = {
  regex: /\{\+\+(.*?)\+\+\}/gs,
  render(_, match) {
    if (match.trim() === "") {
      return `\n\n<ins class="break">&nbsp;</ins>\n\n`;
    }

    return `<ins>${match}</ins>`;
  }
};

module.exports = { addition };
