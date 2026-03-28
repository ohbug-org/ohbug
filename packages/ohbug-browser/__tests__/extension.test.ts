import { describe, expect, test } from "vitest";

import { extension } from "../src/extension";

describe("@ohbug/browser/extension", () => {
  test("extension has the correct name", () => {
    expect(extension.name).toBe("OhbugBrowser");
  });

  test("extension has onSetup function", () => {
    expect(typeof extension.onSetup).toBe("function");
  });
});
