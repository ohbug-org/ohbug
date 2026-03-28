import { describe, expect, test } from "vitest";

import { version } from "../src/version";

describe("@ohbug/browser/version", () => {
  test("version is a string", () => {
    expect(typeof version).toBe("string");
  });
});
