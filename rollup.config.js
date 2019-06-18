const resolve = require("rollup-plugin-babel");
const babel = require("rollup-plugin-babel");

const input = "src/index.js";

const output = {
  file: "lib/critic-markup.js",
  format: "cjs"
};

const plugins = [resolve(), babel()];

module.exports = { input, output, plugins };
