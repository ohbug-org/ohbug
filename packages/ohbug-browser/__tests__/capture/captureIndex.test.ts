import { afterEach, beforeEach, describe, expect, test } from "vitest";

import {
  captureNetwork,
  captureScript,
  removeCaptureAction,
  removeCaptureNetwork,
  removeCaptureScript,
} from "../../src/capture";
import { cleanupTestClient, setupTestClient } from "../utils";

describe("@ohbug/browser/capture/index", () => {
  beforeEach(() => {
    setupTestClient();
  });

  afterEach(() => {
    cleanupTestClient();
  });

  test("captureScript does not throw", () => {
    expect(() => captureScript()).not.toThrow();
  });

  test("removeCaptureScript does not throw", () => {
    expect(() => removeCaptureScript()).not.toThrow();
  });

  test("captureNetwork does not throw", () => {
    expect(() => captureNetwork()).not.toThrow();
  });

  test("removeCaptureNetwork does not throw", () => {
    expect(() => removeCaptureNetwork()).not.toThrow();
  });

  test("removeCaptureAction does not throw", () => {
    expect(() => removeCaptureAction()).not.toThrow();
  });

  test("captureScript skips when addEventListener is not available", () => {
    const original = window.addEventListener;
    delete (window as any).addEventListener;
    // This should be a no-op
    expect(() => captureScript()).not.toThrow();
    window.addEventListener = original;
  });
});
