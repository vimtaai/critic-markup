const { addition } = require("./addition");
const { deletion } = require("./deletion");

const substitution = {
  regex: /\{~~(.*?)~>(.*?)~~\}/gs,
  render(_, match1, match2) {
    return deletion.render(_, match1) + addition.render(_, match2);
  }
};

module.exports = { substitution };
