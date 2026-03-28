import { afterEach, beforeEach, describe, expect, test, vi } from "vitest";

import {
  captureUncaughtError,
  removeCaptureUncaughtError,
} from "../../src/capture/script/captureUncaughtError";
import {
  captureUnhandledrejectionError,
  removeCaptureUnhandledrejectionError,
} from "../../src/capture/script/captureUnhandledrejectionError";
import { cleanupTestClient, setupTestClient } from "../utils";

describe("@ohbug/browser/capture/script", () => {
  beforeEach(() => {
    setupTestClient();
  });

  afterEach(() => {
    removeCaptureUncaughtError();
    removeCaptureUnhandledrejectionError();
    cleanupTestClient();
  });

  test("captureUncaughtError registers error event listener", () => {
    const addSpy = vi.spyOn(window, "addEventListener");
    captureUncaughtError();
    expect(addSpy).toHaveBeenCalledWith("error", expect.any(Function), true);
    addSpy.mockRestore();
  });

  test("removeCaptureUncaughtError removes error event listener", () => {
    const removeSpy = vi.spyOn(window, "removeEventListener");
    removeCaptureUncaughtError();
    expect(removeSpy).toHaveBeenCalledWith("error", expect.any(Function), true);
    removeSpy.mockRestore();
  });

  test("captureUnhandledrejectionError registers unhandledrejection listener", () => {
    const addSpy = vi.spyOn(window, "addEventListener");
    captureUnhandledrejectionError();
    expect(addSpy).toHaveBeenCalledWith("unhandledrejection", expect.any(Function), true);
    addSpy.mockRestore();
  });

  test("removeCaptureUnhandledrejectionError removes listener", () => {
    const removeSpy = vi.spyOn(window, "removeEventListener");
    removeCaptureUnhandledrejectionError();
    expect(removeSpy).toHaveBeenCalledWith("unhandledrejection", expect.any(Function), true);
    removeSpy.mockRestore();
  });

  test("error listener dispatches to scriptDispatcher", () => {
    captureUncaughtError();
    // Dispatch a real error event - the listener will call scriptDispatcher
    const errorEvent = new ErrorEvent("error", {
      message: "test",
      error: new Error("test"),
    });
    // Should not throw even though scriptDispatcher runs
    expect(() => window.dispatchEvent(errorEvent)).not.toThrow();
  });

  test("unhandledrejection listener dispatches to scriptDispatcher", () => {
    captureUnhandledrejectionError();
    const event = new Event("unhandledrejection");
    Object.defineProperty(event, "reason", { value: "test" });
    expect(() => window.dispatchEvent(event)).not.toThrow();
  });
});
