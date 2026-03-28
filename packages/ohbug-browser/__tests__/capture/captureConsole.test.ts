import { afterEach, beforeEach, describe, expect, test } from "vitest";

import { captureConsole, removeCaptureConsole } from "../../src/capture/console/captureConsole";
import { cleanupTestClient, setupTestClient } from "../utils";

describe("@ohbug/browser/capture/console", () => {
  beforeEach(() => {
    setupTestClient();
  });

  afterEach(() => {
    removeCaptureConsole();
    cleanupTestClient();
  });

  test("captureConsole replaces console methods", () => {
    const originalLog = console.log;
    captureConsole();
    expect(console.log).not.toBe(originalLog);
  });

  test("removeCaptureConsole restores console methods", () => {
    captureConsole();
    removeCaptureConsole();
    // After removal the methods should still be functions
    expect(typeof console.log).toBe("function");
    expect(typeof console.warn).toBe("function");
  });

  test("captured console calls still execute without error", () => {
    captureConsole();
    expect(() => console.log("test")).not.toThrow();
    expect(() => console.warn("test")).not.toThrow();
    expect(() => console.error("test")).not.toThrow();
  });

  test("does not record Ohbug internal console messages as actions", () => {
    captureConsole();
    const client = (window as any).__OHBUG__.client;
    const initialLength = client.__actions.length;
    console.log("Ohbug internal message");
    expect(client.__actions.length).toBe(initialLength);
  });

  test("records non-Ohbug console messages as actions", () => {
    captureConsole();
    const client = (window as any).__OHBUG__.client;
    const initialLength = client.__actions.length;
    console.log("user message");
    expect(client.__actions.length).toBe(initialLength + 1);
  });
});
