import { afterEach, describe, expect, test, vi } from "vitest";

import { destroy, handleDestroy } from "../src/destroy";
import { cleanupTestClient, setupTestClient } from "./utils";

describe("@ohbug/browser/destroy", () => {
  afterEach(() => {
    cleanupTestClient();
  });

  test("destroy does not throw", () => {
    setupTestClient();
    expect(() => destroy()).not.toThrow();
  });

  test("handleDestroy registers unload event listener", () => {
    setupTestClient();
    const addSpy = vi.spyOn(window, "addEventListener");
    handleDestroy();
    expect(addSpy).toHaveBeenCalledWith("unload", expect.any(Function), true);

    // Trigger the unload event to cover the callback body
    const unloadCallback = addSpy.mock.calls.find((c) => c[0] === "unload")?.[1] as Function;
    expect(unloadCallback).toBeDefined();
    expect(() => unloadCallback()).not.toThrow();

    addSpy.mockRestore();
  });
});
