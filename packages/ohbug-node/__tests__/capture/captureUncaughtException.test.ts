// @vitest-environment node
import { afterEach, beforeEach, describe, expect, test, vi } from "vitest";

import {
  captureUncaughtException,
  removeCaptureUncaughtException,
} from "../../src/capture/captureUncaughtException";
import { cleanupTestClient, setupTestClient } from "../utils";

// Mock the handler so we can track calls without side effects
vi.mock("../../src/handle/uncaughtExceptionHandler", () => ({
  uncaughtExceptionHandler: vi.fn().mockResolvedValue(undefined),
}));
import { uncaughtExceptionHandler } from "../../src/handle/uncaughtExceptionHandler";

describe("@ohbug/node/capture/captureUncaughtException", () => {
  afterEach(() => {
    removeCaptureUncaughtException();
    vi.clearAllMocks();
  });

  test("registers uncaughtException listener on process", () => {
    const spy = vi.spyOn(process, "on");
    captureUncaughtException();

    expect(spy).toHaveBeenCalledWith("uncaughtException", expect.any(Function));
    spy.mockRestore();
  });

  test("removes uncaughtException listener from process", () => {
    captureUncaughtException();
    const spy = vi.spyOn(process, "removeListener");

    removeCaptureUncaughtException();

    expect(spy).toHaveBeenCalledWith("uncaughtException", expect.any(Function));
    spy.mockRestore();
  });

  describe("listener callback", () => {
    let savedListeners: Function[];

    beforeEach(() => {
      setupTestClient();
      // Save and remove other uncaughtException listeners (e.g. from vitest)
      // so they don't interfere with the "no other listeners" check
      savedListeners = process.listeners("uncaughtException").slice();
      process.removeAllListeners("uncaughtException");
    });

    afterEach(() => {
      removeCaptureUncaughtException();
      cleanupTestClient();
      // Restore saved listeners
      for (const l of savedListeners) {
        process.on("uncaughtException", l as NodeJS.UncaughtExceptionListener);
      }
    });

    test("calls uncaughtExceptionHandler with error and origin", () => {
      // Add a noop listener so the exit path is not triggered
      const noop = () => {};
      process.on("uncaughtException", noop);

      captureUncaughtException();
      const listeners = process.listeners("uncaughtException");
      const ourListener = listeners.find((l) => l !== noop) as Function;

      const error = new Error("test uncaught");
      ourListener(error, "uncaughtException");

      expect(uncaughtExceptionHandler).toHaveBeenCalledWith(error, "uncaughtException");

      process.removeListener("uncaughtException", noop);
    });

    test("silently returns when handler throws (client not initialized)", () => {
      cleanupTestClient(); // remove __OHBUG__ so getOhbugObject throws
      vi.mocked(uncaughtExceptionHandler).mockImplementationOnce(() => {
        throw new Error("client destroyed");
      });

      captureUncaughtException();
      const listeners = process.listeners("uncaughtException");
      const ourListener = listeners[listeners.length - 1] as Function;

      // Should not throw
      expect(() => ourListener(new Error("test"), "uncaughtException")).not.toThrow();
    });

    test("schedules process.exit when no other uncaughtException listeners", async () => {
      vi.useFakeTimers();
      const exitSpy = vi.spyOn(process, "exit").mockImplementation(() => undefined as never);

      captureUncaughtException();
      const listeners = process.listeners("uncaughtException");
      const ourListener = listeners[listeners.length - 1] as Function;

      ourListener(new Error("fatal"), "uncaughtException");

      // Flush microtasks (.finally() callback) and timers
      await vi.runAllTimersAsync();

      expect(exitSpy).toHaveBeenCalledWith(1);

      exitSpy.mockRestore();
      vi.useRealTimers();
    });

    test("does not exit when other uncaughtException listeners exist", async () => {
      vi.useFakeTimers();
      const exitSpy = vi.spyOn(process, "exit").mockImplementation(() => undefined as never);

      // Add another listener so our listener sees it's not alone
      const noop = () => {};
      process.on("uncaughtException", noop);

      captureUncaughtException();
      const listeners = process.listeners("uncaughtException");
      const ourListener = listeners.find((l) => l !== noop) as Function;

      ourListener(new Error("non-fatal"), "uncaughtException");

      await vi.runAllTimersAsync();

      expect(exitSpy).not.toHaveBeenCalled();

      process.removeListener("uncaughtException", noop);
      exitSpy.mockRestore();
      vi.useRealTimers();
    });

    test("reentrancy protection prevents multiple exits", async () => {
      vi.useFakeTimers();
      const exitSpy = vi.spyOn(process, "exit").mockImplementation(() => undefined as never);

      // Make the handler return a promise that doesn't resolve immediately
      vi.mocked(uncaughtExceptionHandler).mockReturnValue(
        new Promise(() => {}), // never resolves
      );

      captureUncaughtException();
      const listeners = process.listeners("uncaughtException");
      const ourListener = listeners[listeners.length - 1] as Function;

      // First call sets exiting=true
      ourListener(new Error("first"), "uncaughtException");
      // Second call should return early due to exiting flag
      ourListener(new Error("second"), "uncaughtException");

      // Handler is called for both, but exit logic only runs once
      expect(uncaughtExceptionHandler).toHaveBeenCalledTimes(2);

      // Advance to trigger the setTimeout fallback from the first call only
      vi.advanceTimersByTime(2000);
      expect(exitSpy).toHaveBeenCalledTimes(1);

      exitSpy.mockRestore();
      vi.useRealTimers();
    });

    test("SHUTDOWN_TIMEOUT forces exit after 2 seconds", () => {
      vi.useFakeTimers();
      const exitSpy = vi.spyOn(process, "exit").mockImplementation(() => undefined as never);

      // Make the handler return a promise that never resolves
      vi.mocked(uncaughtExceptionHandler).mockReturnValue(new Promise(() => {}));

      captureUncaughtException();
      const listeners = process.listeners("uncaughtException");
      const ourListener = listeners[listeners.length - 1] as Function;

      ourListener(new Error("hanging"), "uncaughtException");

      // Advance past the 2s shutdown timeout
      vi.advanceTimersByTime(2000);

      expect(exitSpy).toHaveBeenCalledWith(1);

      exitSpy.mockRestore();
      vi.useRealTimers();
    });
  });
});
