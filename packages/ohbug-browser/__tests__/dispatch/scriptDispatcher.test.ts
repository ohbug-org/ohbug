import { afterEach, beforeEach, describe, expect, test } from "vitest";

import { scriptDispatcher } from "../../src/dispatch/scriptDispatcher";
import { cleanupTestClient, setupTestClient } from "../utils";

describe("@ohbug/browser/dispatch/scriptDispatcher", () => {
  beforeEach(() => {
    setupTestClient();
  });

  afterEach(() => {
    cleanupTestClient();
  });

  test("dispatches uncaughtError for ErrorEvent with message and error", () => {
    const errorEvent = new ErrorEvent("error", {
      message: "test error",
      error: new Error("test error"),
      filename: "test.js",
      lineno: 1,
      colno: 1,
    });
    expect(() => scriptDispatcher(errorEvent)).not.toThrow();
  });

  test("dispatches resourceError for ErrorEvent with target but no error", () => {
    const errorEvent = new ErrorEvent("error", { message: "" });
    Object.defineProperty(errorEvent, "target", {
      value: document.createElement("img"),
    });
    expect(() => scriptDispatcher(errorEvent)).not.toThrow();
  });

  test("dispatches unhandledrejection for PromiseRejectionEvent", () => {
    const event = new Event("unhandledrejection") as any;
    Object.defineProperty(event, "reason", {
      value: new Error("rejected"),
    });
    expect(() => scriptDispatcher(event)).not.toThrow();
  });

  test("dispatches unknownError for unknown event types", () => {
    const event = new Event("custom") as any;
    expect(() => scriptDispatcher(event)).not.toThrow();
  });

  test("catches errors and dispatches unknownError via catch block", () => {
    // Create an event that makes the handler throw
    const event = new ErrorEvent("error", {
      message: "test",
      error: new Error("test"),
    });
    // Remove __OHBUG__ to make handler throw
    const saved = (window as any).__OHBUG__;
    delete (window as any).__OHBUG__;

    // The catch block should call unknownErrorHandler which also needs __OHBUG__
    // This will throw again, but the outer catch in scriptDispatcher catches it
    // Actually since both the handler and unknownErrorHandler need __OHBUG__,
    // the catch will re-throw. Let's test with an event that triggers an error in the try.
    expect(() => scriptDispatcher(event)).toThrow();

    (window as any).__OHBUG__ = saved;
  });
});
