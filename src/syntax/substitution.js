const { addition } = require("./addition");
const { deletion } = require("./deletion");

const substitution = {
  regex: /\{~~(.*?)~>(.*?)~~\}/gs,
  regexOffset: 0,
  annotate(match) {
    return { type: "substitution", ...match };
  },
  render(_, match1, match2) {
    return deletion.render(_, match1) + addition.render(_, match2).trimLeft();
  }
};

module.exports = { substitution };
