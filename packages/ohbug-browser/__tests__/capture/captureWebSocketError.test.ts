import { afterEach, beforeEach, describe, expect, test } from "vitest";

import { captureWebSocketError } from "../../src/capture/network/captureWebSocketError";
import { cleanupTestClient, setupTestClient } from "../utils";

describe("@ohbug/browser/capture/network/captureWebSocketError", () => {
  beforeEach(() => {
    setupTestClient();
  });

  afterEach(() => {
    cleanupTestClient();
  });

  test("captureWebSocketError does not throw", () => {
    expect(() => captureWebSocketError()).not.toThrow();
  });

  test("overrides WebSocket.prototype.onerror setter", () => {
    const originalDescriptor = Object.getOwnPropertyDescriptor(WebSocket.prototype, "onerror");

    captureWebSocketError();

    const newDescriptor = Object.getOwnPropertyDescriptor(WebSocket.prototype, "onerror");
    expect(newDescriptor).toBeDefined();
    expect(typeof newDescriptor?.set).toBe("function");

    // Restore original
    if (originalDescriptor) {
      Object.defineProperty(WebSocket.prototype, "onerror", originalDescriptor);
    }
  });
});
