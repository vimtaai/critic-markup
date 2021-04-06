import { addition } from "./addition.js";
import { deletion } from "./deletion.js";

export const substitution = {
  regex: /\{~~(.*?)~>(.*?)~~\}/gs,
  validate: () => true,
  annotate(match) {
    return { type: "substitution", ...match };
  },
  render(_, match1, match2) {
    return deletion.render(_, match1) + addition.render(_, match2).trimLeft();
  }
};
