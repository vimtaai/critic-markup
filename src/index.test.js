const { renderCriticMarkup } = require("./index");

test("Complex example should render inline properly", function() {
  const input = `Don't go around saying{-- to people that--} the world owes you a living. The world owes you nothing. It was here first. {~~One~>Only one~~} thing is impossible for God: To find {++any++} sense in any copyright law on the planet. {==Truth is stranger than fiction==}{>>strange but true<<}, but it is because Fiction is obliged to stick to possibilities; Truth isn't.`;
  const expectedOutput = `Don't go around saying<del> to people that</del> the world owes you a living. The world owes you nothing. It was here first. <del>One</del><ins>Only one</ins> thing is impossible for God: To find <ins>any</ins> sense in any copyright law on the planet. <mark>Truth is stranger than fiction</mark><span class="critic comment">strange but true</span>, but it is because Fiction is obliged to stick to possibilities; Truth isn't.`;
  expect(renderCriticMarkup(input)).toBe(expectedOutput);
});
