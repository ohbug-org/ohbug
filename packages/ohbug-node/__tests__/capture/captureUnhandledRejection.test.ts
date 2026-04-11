// @vitest-environment node
import { afterEach, beforeEach, describe, expect, test, vi } from "vitest";

import {
  captureUnhandledRejection,
  removeCaptureUnhandledRejection,
} from "../../src/capture/captureUnhandledRejection";
import { cleanupTestClient, setupTestClient } from "../utils";

// Mock the handler to track calls
vi.mock("../../src/handle/unhandledRejectionHandler", () => ({
  unhandledRejectionHandler: vi.fn(),
}));
import { unhandledRejectionHandler } from "../../src/handle/unhandledRejectionHandler";

describe("@ohbug/node/capture/captureUnhandledRejection", () => {
  afterEach(() => {
    removeCaptureUnhandledRejection();
    vi.clearAllMocks();
  });

  test("registers unhandledRejection listener on process", () => {
    const spy = vi.spyOn(process, "on");
    captureUnhandledRejection();

    expect(spy).toHaveBeenCalledWith("unhandledRejection", expect.any(Function));
    spy.mockRestore();
  });

  test("removes unhandledRejection listener from process", () => {
    captureUnhandledRejection();
    const spy = vi.spyOn(process, "removeListener");

    removeCaptureUnhandledRejection();

    expect(spy).toHaveBeenCalledWith("unhandledRejection", expect.any(Function));
    spy.mockRestore();
  });

  describe("listener callback", () => {
    let savedListeners: Function[];

    beforeEach(() => {
      setupTestClient();
      savedListeners = process.listeners("unhandledRejection").slice();
      process.removeAllListeners("unhandledRejection");
    });

    afterEach(() => {
      removeCaptureUnhandledRejection();
      cleanupTestClient();
      for (const l of savedListeners) {
        process.on("unhandledRejection", l as NodeJS.UnhandledRejectionListener);
      }
    });

    test("calls unhandledRejectionHandler with Error reason", () => {
      captureUnhandledRejection();

      const listeners = process.listeners("unhandledRejection");
      const ourListener = listeners[listeners.length - 1] as Function;

      const error = new Error("rejected");
      const promise = Promise.resolve();
      ourListener(error, promise);

      expect(unhandledRejectionHandler).toHaveBeenCalledWith(error, promise);
    });

    test("calls unhandledRejectionHandler with string reason", () => {
      captureUnhandledRejection();

      const listeners = process.listeners("unhandledRejection");
      const ourListener = listeners[listeners.length - 1] as Function;

      const promise = Promise.resolve();
      ourListener("string rejection", promise);

      expect(unhandledRejectionHandler).toHaveBeenCalledWith("string rejection", promise);
    });

    test("calls unhandledRejectionHandler with null reason", () => {
      captureUnhandledRejection();

      const listeners = process.listeners("unhandledRejection");
      const ourListener = listeners[listeners.length - 1] as Function;

      const promise = Promise.resolve();
      ourListener(null, promise);

      expect(unhandledRejectionHandler).toHaveBeenCalledWith(null, promise);
    });

    test("calls unhandledRejectionHandler with undefined reason", () => {
      captureUnhandledRejection();

      const listeners = process.listeners("unhandledRejection");
      const ourListener = listeners[listeners.length - 1] as Function;

      const promise = Promise.resolve();
      ourListener(undefined, promise);

      expect(unhandledRejectionHandler).toHaveBeenCalledWith(undefined, promise);
    });
  });
});
