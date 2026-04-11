import type { OhbugClient } from "@ohbug/types";
// @vitest-environment node
import { afterEach, beforeEach, describe, expect, test, vi } from "vitest";

import { captureConsole, removeCaptureConsole } from "../../src/capture/captureConsole";
import { cleanupTestClient, setupTestClient } from "../utils";

describe("@ohbug/node/capture/captureConsole", () => {
  const originalLog = console.log;
  const originalInfo = console.info;
  const originalWarn = console.warn;
  const originalError = console.error;

  let client: OhbugClient;

  beforeEach(() => {
    client = setupTestClient();
  });

  afterEach(() => {
    removeCaptureConsole();
    cleanupTestClient();
    // Ensure console is restored
    console.log = originalLog;
    console.info = originalInfo;
    console.warn = originalWarn;
    console.error = originalError;
  });

  test("replaces console methods after capture", () => {
    captureConsole();

    expect(console.log).not.toBe(originalLog);
    expect(console.info).not.toBe(originalInfo);
    expect(console.warn).not.toBe(originalWarn);
    expect(console.error).not.toBe(originalError);
  });

  test("restores console methods after removal", () => {
    captureConsole();
    removeCaptureConsole();

    expect(console.log).toBe(originalLog);
    expect(console.info).toBe(originalInfo);
    expect(console.warn).toBe(originalWarn);
    expect(console.error).toBe(originalError);
  });

  test("calls original console method and records action", () => {
    const addActionSpy = vi.spyOn(client, "addAction");

    captureConsole();
    console.log("test message");

    expect(addActionSpy).toHaveBeenCalledWith("console.log", ["test message"], "console");
    addActionSpy.mockRestore();
  });

  test("skips Ohbug internal messages", () => {
    const addActionSpy = vi.spyOn(client, "addAction");

    captureConsole();
    console.log("Ohbug internal message");

    expect(addActionSpy).not.toHaveBeenCalled();
    addActionSpy.mockRestore();
  });
});
