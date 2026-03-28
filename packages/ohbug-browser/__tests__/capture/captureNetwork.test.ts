import { afterEach, beforeEach, describe, expect, test } from "vitest";

import {
  captureAjaxError,
  removeCaptureAjaxError,
} from "../../src/capture/network/captureAjaxError";
import {
  captureFetchError,
  removeCaptureFetchError,
} from "../../src/capture/network/captureFetchError";
import { cleanupTestClient, setupTestClient } from "../utils";

describe("@ohbug/browser/capture/network", () => {
  beforeEach(() => {
    setupTestClient();
  });

  afterEach(() => {
    removeCaptureAjaxError();
    removeCaptureFetchError();
    cleanupTestClient();
  });

  describe("captureAjaxError", () => {
    test("replaces XMLHttpRequest.prototype.open and send", () => {
      const desc = Object.getOwnPropertyDescriptor(XMLHttpRequest.prototype, "open");
      captureAjaxError();
      const newDesc = Object.getOwnPropertyDescriptor(XMLHttpRequest.prototype, "open");
      // The value should have changed
      expect(newDesc?.value).not.toBe(desc?.value);
    });

    test("removeCaptureAjaxError restores original methods", () => {
      captureAjaxError();
      removeCaptureAjaxError();
      expect(typeof XMLHttpRequest.prototype.open).toBe("function");
      expect(typeof XMLHttpRequest.prototype.send).toBe("function");
    });
  });

  describe("captureFetchError", () => {
    test("replaces global fetch", () => {
      const originalFetch = window.fetch;
      captureFetchError();
      expect(window.fetch).not.toBe(originalFetch);
    });

    test("removeCaptureFetchError restores fetch", () => {
      captureFetchError();
      removeCaptureFetchError();
      expect(typeof window.fetch).toBe("function");
    });
  });
});
