import { describe, expect, test } from "vitest";

import { defineExtension } from "../src/extension";

describe("@ohbug/core/extension", () => {
  test("returns the extension as-is", () => {
    const ext = { name: "test" };
    expect(defineExtension(ext)).toBe(ext);
  });

  test("returns empty object for falsy input", () => {
    // @ts-expect-error testing falsy
    expect(defineExtension(null)).toEqual({});
    // @ts-expect-error testing falsy
    expect(defineExtension(undefined)).toEqual({});
    // @ts-expect-error testing falsy
    expect(defineExtension(0)).toEqual({});
  });
});
