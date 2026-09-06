import { strict as assert } from "node:assert";
import { describe, it } from "node:test";

import { escapeHtml } from "./escape-html.js";

describe("escapeHtml", () => {
  it("should escape ampersands", () => {
    const input = "Tom & Jerry";
    const expectedOutput = "Tom &amp; Jerry";

    const escapedText = escapeHtml(input);
    assert.strictEqual(escapedText, expectedOutput);
  });

  it("should escape angle brackets", () => {
    const input = "<script>alert(1)</script>";
    const expectedOutput = "&lt;script&gt;alert(1)&lt;/script&gt;";

    const escapedText = escapeHtml(input);
    assert.strictEqual(escapedText, expectedOutput);
  });

  it("should escape quotes", () => {
    const input = `"double" and 'single'`;
    const expectedOutput = "&quot;double&quot; and &#39;single&#39;";

    const escapedText = escapeHtml(input);
    assert.strictEqual(escapedText, expectedOutput);
  });

  it("should leave plain text untouched", () => {
    const input = "Lorem ipsum dolor sit amet";
    const expectedOutput = "Lorem ipsum dolor sit amet";

    const escapedText = escapeHtml(input);
    assert.strictEqual(escapedText, expectedOutput);
  });
});
