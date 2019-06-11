const { comment } = require("./comment");

const highlight = {
  regex: /\{==(.*?)==\}\{>>(.*?)<<\}/gs,
  regexOffset: 0,
  annotate(match) {
    return { type: "highlight", ...match };
  },
  render(_, match1, match2) {
    return `<mark>${match1}</mark>${comment.render(_, match2)}`;
  }
};

module.exports = { highlight };
