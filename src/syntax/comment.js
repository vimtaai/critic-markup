const comment = {
  regex: /\{>>(.*?)<<\}/gs,
  render(_, match) {
    return `<span class="critic comment">${match}</span>`;
  }
};

module.exports = { comment };
