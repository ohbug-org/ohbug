import type { OhbugEventWithMethods } from "@ohbug/types";
import { afterEach, describe, expect, test, vi } from "vitest";

import { notifier } from "../src/notifier";
import { cleanupTestClient, setupTestClient } from "./utils";

describe("@ohbug/browser/notifier", () => {
  afterEach(() => {
    cleanupTestClient();
    vi.restoreAllMocks();
  });

  test("sends via navigator.sendBeacon when available", () => {
    setupTestClient();
    const mockSendBeacon = vi.fn(() => true);
    navigator.sendBeacon = mockSendBeacon;

    const event = { type: "test" } as OhbugEventWithMethods<any>;
    void notifier(event);

    expect(mockSendBeacon).toHaveBeenCalledTimes(1);
  });

  test("handles circular references in event data", () => {
    setupTestClient();
    const mockSendBeacon = vi.fn(() => true);
    navigator.sendBeacon = mockSendBeacon;

    const circular: any = { type: "test" };
    circular.self = circular;

    expect(() => notifier(circular as any)).not.toThrow();
    expect(mockSendBeacon).toHaveBeenCalledTimes(1);
  });

  test("falls back to XMLHttpRequest when sendBeacon is not available", async () => {
    setupTestClient();
    Object.defineProperty(navigator, "sendBeacon", {
      value: undefined,
      writable: true,
      configurable: true,
    });

    const OrigXHR = window.XMLHttpRequest;
    class MockXHR {
      readyState = 0;
      status = 200;
      response = "ok";
      onreadystatechange: any = null;
      open = vi.fn();
      send = vi.fn(() => {
        this.readyState = 4;
        this.status = 200;
        this.onreadystatechange?.();
      });
      setRequestHeader = vi.fn();
    }
    window.XMLHttpRequest = MockXHR as any;
    (MockXHR as any).DONE = 4;

    const event = { type: "test", toJSON: () => ({ type: "test" }) } as any;
    const result = await notifier(event);

    expect(result).toBe("ok");

    window.XMLHttpRequest = OrigXHR;
  });

  test("XMLHttpRequest rejects when status is error", async () => {
    setupTestClient();
    Object.defineProperty(navigator, "sendBeacon", {
      value: undefined,
      writable: true,
      configurable: true,
    });

    const OrigXHR = window.XMLHttpRequest;
    class MockXHR {
      readyState = 0;
      status = 500;
      response = "error";
      onreadystatechange: any = null;
      open = vi.fn();
      send = vi.fn(() => {
        this.readyState = 4;
        this.onreadystatechange?.();
      });
      setRequestHeader = vi.fn();
    }
    (MockXHR as any).DONE = 4;
    window.XMLHttpRequest = MockXHR as any;

    const event = { type: "test", toJSON: () => ({ type: "test" }) } as any;

    await expect(notifier(event)).rejects.toBeDefined();

    window.XMLHttpRequest = OrigXHR;
  });
});
