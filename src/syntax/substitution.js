import { addition } from "./addition";
import { deletion } from "./deletion";

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
