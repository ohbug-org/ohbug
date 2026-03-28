import { describe, expect, test, vi } from "vitest";

vi.mock("@ohbug/types", () => ({}));

import extension from "../src/extension";

describe("@ohbug/extension-view/extension", () => {
  test("should have correct name", () => {
    const ext = extension();
    expect(ext.name).toBe("OhbugExtensionView");
  });

  test("should have onSetup hook", () => {
    const ext = extension();
    expect(ext.onSetup).toBeDefined();
    expect(typeof ext.onSetup).toBe("function");
  });

  test("should have onDestroy hook", () => {
    const ext = extension();
    expect(ext.onDestroy).toBeDefined();
    expect(typeof ext.onDestroy).toBe("function");
  });
});
