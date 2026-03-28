import { afterEach, beforeEach, describe, expect, test } from "vitest";

import { ajaxErrorHandler } from "../../src/handle/ajaxErrorHandler";
import { fetchErrorHandler } from "../../src/handle/fetchErrorHandler";
import { uncaughtErrorHandler } from "../../src/handle/uncaughtErrorHandler";
import { unhandledrejectionErrorHandler } from "../../src/handle/unhandledrejectionErrorHandler";
import { unknownErrorHandler } from "../../src/handle/unknownErrorHandler";
import { websocketErrorHandler } from "../../src/handle/websocketErrorHandler";
import { cleanupTestClient, setupTestClient } from "../utils";

describe("@ohbug/browser/handle", () => {
  beforeEach(() => {
    setupTestClient();
  });

  afterEach(() => {
    cleanupTestClient();
  });

  describe("ajaxErrorHandler", () => {
    test("creates and notifies an AJAX error event", () => {
      const detail = {
        req: { url: "/api", method: "GET", data: undefined, params: undefined },
        res: { status: 500, statusText: "Error", response: "error" },
      };
      expect(() => ajaxErrorHandler(detail)).not.toThrow();
    });
  });

  describe("fetchErrorHandler", () => {
    test("creates and notifies a fetch error event", () => {
      const detail = {
        req: { url: "/api", method: "POST", data: undefined, params: undefined },
        res: { status: 400, statusText: "Bad Request" },
      };
      expect(() => fetchErrorHandler(detail)).not.toThrow();
    });
  });

  describe("websocketErrorHandler", () => {
    test("creates and notifies a websocket error event", () => {
      const detail = {
        url: "ws://localhost",
        params: undefined,
        timeStamp: Date.now(),
        readyState: 3,
        protocol: "",
        extensions: "",
        binaryType: "blob" as const,
        bufferedAmount: 0,
      };
      expect(() => websocketErrorHandler(detail)).not.toThrow();
    });
  });

  describe("uncaughtErrorHandler", () => {
    test("creates and notifies an uncaught error event", () => {
      const err = new Error("test uncaught");
      const errorEvent = new ErrorEvent("error", {
        message: "test uncaught",
        error: err,
        filename: "test.js",
        lineno: 10,
        colno: 5,
      });
      expect(() => uncaughtErrorHandler(errorEvent)).not.toThrow();
    });

    test("handles error event without error object", () => {
      const errorEvent = new ErrorEvent("error", { message: "test" });
      expect(() => uncaughtErrorHandler(errorEvent)).not.toThrow();
    });
  });

  describe("unhandledrejectionErrorHandler", () => {
    test("creates and notifies an unhandledrejection error event", () => {
      const event = new Event("unhandledrejection") as any;
      Object.defineProperty(event, "reason", {
        value: new Error("rejected promise"),
      });
      expect(() => unhandledrejectionErrorHandler(event)).not.toThrow();
    });

    test("handles event without error-like reason", () => {
      const event = new Event("unhandledrejection") as any;
      Object.defineProperty(event, "reason", { value: "string reason" });
      expect(() => unhandledrejectionErrorHandler(event)).not.toThrow();
    });
  });

  describe("unknownErrorHandler", () => {
    test("creates and notifies an unknown error event", () => {
      const event = {
        message: "unknown",
        error: new Error("unknown"),
        filename: "file.js",
        lineno: 1,
        colno: 1,
      };
      expect(() => unknownErrorHandler(event)).not.toThrow();
    });

    test("handles event without error object", () => {
      const event = { message: "no error object" };
      expect(() => unknownErrorHandler(event)).not.toThrow();
    });
  });
});
