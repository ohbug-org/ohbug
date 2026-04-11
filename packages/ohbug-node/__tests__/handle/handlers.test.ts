// @vitest-environment node
import { afterEach, beforeEach, describe, expect, test, vi } from "vitest";

import { uncaughtExceptionHandler } from "../../src/handle/uncaughtExceptionHandler";
import { unhandledRejectionHandler } from "../../src/handle/unhandledRejectionHandler";
import { unknownErrorHandler } from "../../src/handle/unknownErrorHandler";
import { cleanupTestClient, setupTestClient } from "../utils";

describe("@ohbug/node/handle", () => {
  let client: ReturnType<typeof setupTestClient>;

  beforeEach(() => {
    client = setupTestClient();
  });

  afterEach(() => {
    cleanupTestClient();
    vi.restoreAllMocks();
  });

  describe("uncaughtExceptionHandler", () => {
    test("creates event with correct type and detail", async () => {
      const createEventSpy = vi.spyOn(client, "createEvent");
      const notifySpy = vi.spyOn(client, "notify").mockResolvedValue(null);

      const error = new Error("test uncaught");
      await uncaughtExceptionHandler(error, "uncaughtException");

      expect(createEventSpy).toHaveBeenCalledWith({
        category: "error",
        type: "uncaughtError",
        detail: {
          name: "Error",
          message: "test uncaught",
          stack: error.stack,
          origin: "uncaughtException",
        },
      });
      expect(notifySpy).toHaveBeenCalled();
    });

    test("handles error without stack", async () => {
      const notifySpy = vi.spyOn(client, "notify").mockResolvedValue(null);

      const error = new Error("no stack");
      error.stack = undefined;
      await uncaughtExceptionHandler(error, "uncaughtException");

      expect(notifySpy).toHaveBeenCalled();
    });
  });

  describe("unhandledRejectionHandler", () => {
    test("handles Error as reason", () => {
      const createEventSpy = vi.spyOn(client, "createEvent");
      vi.spyOn(client, "notify").mockResolvedValue(null);

      const error = new Error("rejected promise");
      unhandledRejectionHandler(error, Promise.resolve());

      expect(createEventSpy).toHaveBeenCalledWith({
        category: "error",
        type: "unhandledrejectionError",
        detail: {
          name: "Error",
          message: "rejected promise",
          stack: error.stack,
        },
      });
    });

    test("handles string as reason", () => {
      const createEventSpy = vi.spyOn(client, "createEvent");
      vi.spyOn(client, "notify").mockResolvedValue(null);

      unhandledRejectionHandler("string rejection", Promise.resolve());

      expect(createEventSpy).toHaveBeenCalledWith({
        category: "error",
        type: "unhandledrejectionError",
        detail: {
          name: "UnhandledRejection",
          message: "string rejection",
          stack: undefined,
        },
      });
    });

    test("handles null/undefined as reason", () => {
      vi.spyOn(client, "notify").mockResolvedValue(null);
      const createEventSpy = vi.spyOn(client, "createEvent");

      unhandledRejectionHandler(null, Promise.resolve());

      expect(createEventSpy).toHaveBeenCalledWith({
        category: "error",
        type: "unhandledrejectionError",
        detail: {
          name: "UnhandledRejection",
          message: "null",
          stack: undefined,
        },
      });
    });
  });

  describe("unknownErrorHandler", () => {
    test("handles Error object", () => {
      const createEventSpy = vi.spyOn(client, "createEvent");
      vi.spyOn(client, "notify").mockResolvedValue(null);

      const error = new TypeError("unknown type error");
      unknownErrorHandler(error);

      expect(createEventSpy).toHaveBeenCalledWith({
        category: "error",
        type: "unknownError",
        detail: {
          name: "TypeError",
          message: "unknown type error",
          stack: error.stack,
        },
      });
    });

    test("handles non-Error value", () => {
      const createEventSpy = vi.spyOn(client, "createEvent");
      vi.spyOn(client, "notify").mockResolvedValue(null);

      unknownErrorHandler(42);

      expect(createEventSpy).toHaveBeenCalledWith({
        category: "error",
        type: "unknownError",
        detail: {
          name: "UnknownError",
          message: "42",
          stack: undefined,
        },
      });
    });
  });
});
