import { describe, expect, test } from "vitest";

import { device } from "../src/device";

describe("@ohbug/browser/device", () => {
  test("returns device info from navigator, document and window.location", () => {
    const result = device({} as any);

    expect(result).toHaveProperty("language");
    expect(result).toHaveProperty("userAgent");
    expect(result).toHaveProperty("title");
    expect(result).toHaveProperty("url");
    expect(typeof result.language).toBe("string");
    expect(typeof result.userAgent).toBe("string");
  });

  test("includes referrer from document", () => {
    const result = device({} as any);
    expect(result).toHaveProperty("referrer");
  });

  test("includes connection info when available (Chromium)", () => {
    // Simulate navigator.connection
    const mockConnection = {
      downlink: 10,
      effectiveType: "4g",
      rtt: 50,
    };
    Object.defineProperty(navigator, "connection", {
      value: mockConnection,
      configurable: true,
    });

    const result = device({} as any);
    expect(result.connection).toEqual({
      downlink: 10,
      effectiveType: "4g",
      rtt: 50,
    });

    // Clean up
    Object.defineProperty(navigator, "connection", {
      value: undefined,
      configurable: true,
    });
  });
});
