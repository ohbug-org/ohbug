import { afterEach, beforeEach, describe, expect, test, vi } from "vitest";

vi.mock("@ohbug/types", () => ({}));
vi.mock("web-vitals", () => ({
  onCLS: vi.fn(),
  onFCP: vi.fn(),
  onINP: vi.fn(),
  onLCP: vi.fn(),
  onTTFB: vi.fn(),
}));

import { onCLS, onFCP, onINP, onLCP, onTTFB } from "web-vitals";

import extension from "../src/extension";

describe("@ohbug/extension-web-vitals/extension", () => {
  beforeEach(() => {
    vi.useFakeTimers();
    vi.clearAllMocks();
    Object.defineProperty(document, "visibilityState", {
      value: "visible",
      writable: true,
      configurable: true,
    });
    // Mock PerformanceObserver.supportedEntryTypes
    vi.stubGlobal("PerformanceObserver", {
      supportedEntryTypes: ["layout-shift"],
    });
  });

  afterEach(() => {
    vi.useRealTimers();
    vi.unstubAllGlobals();
  });

  test("should have correct name", () => {
    const ext = extension();
    expect(ext.name).toBe("OhbugExtensionWebVitals");
  });

  test("should have onSetup hook", () => {
    const ext = extension();
    expect(ext.onSetup).toBeDefined();
    expect(typeof ext.onSetup).toBe("function");
  });

  test("onSetup should register all web-vitals callbacks", () => {
    const ext = extension();
    const mockClient = {
      createEvent: vi.fn().mockReturnValue({}),
      notify: vi.fn().mockResolvedValue(undefined),
    } as any;

    ext.onSetup!(mockClient);

    expect(onCLS).toHaveBeenCalledTimes(1);
    expect(onFCP).toHaveBeenCalledTimes(1);
    expect(onINP).toHaveBeenCalledTimes(1);
    expect(onLCP).toHaveBeenCalledTimes(1);
    expect(onTTFB).toHaveBeenCalledTimes(1);
  });

  test("notify callback should accumulate metric values and send on hidden", () => {
    const ext = extension();
    const mockClient = {
      createEvent: vi.fn().mockReturnValue({ type: "web-vitals" }),
      notify: vi.fn().mockResolvedValue(undefined),
    } as any;

    ext.onSetup!(mockClient);

    // Get the notify callback passed to onCLS
    const notifyCallback = vi.mocked(onCLS).mock.calls[0][0];

    // Simulate metric reports
    notifyCallback({ name: "CLS", value: 0.1 } as any);
    notifyCallback({ name: "FCP", value: 1200 } as any);

    // Run the setTimeout that sets up the visibilitychange listener
    vi.runAllTimers();

    // Simulate page becoming hidden
    Object.defineProperty(document, "visibilityState", {
      value: "hidden",
      writable: true,
      configurable: true,
    });
    document.dispatchEvent(new Event("visibilitychange"));

    expect(mockClient.createEvent).toHaveBeenCalledWith({
      category: "performance",
      type: "web-vitals",
      detail: { CLS: 0.1, FCP: 1200 },
    });
    expect(mockClient.notify).toHaveBeenCalled();
  });

  test("should only send values once", () => {
    const ext = extension();
    const mockClient = {
      createEvent: vi.fn().mockReturnValue({ type: "web-vitals" }),
      notify: vi.fn().mockResolvedValue(undefined),
    } as any;

    ext.onSetup!(mockClient);

    const notifyCallback = vi.mocked(onCLS).mock.calls[0][0];
    notifyCallback({ name: "CLS", value: 0.05 } as any);

    vi.runAllTimers();

    // First hidden
    Object.defineProperty(document, "visibilityState", {
      value: "hidden",
      writable: true,
      configurable: true,
    });
    document.dispatchEvent(new Event("visibilitychange"));

    expect(mockClient.createEvent).toHaveBeenCalledTimes(1);

    // Second hidden — should NOT send again
    Object.defineProperty(document, "visibilityState", {
      value: "visible",
      writable: true,
      configurable: true,
    });
    document.dispatchEvent(new Event("visibilitychange"));
    Object.defineProperty(document, "visibilityState", {
      value: "hidden",
      writable: true,
      configurable: true,
    });
    document.dispatchEvent(new Event("visibilitychange"));

    expect(mockClient.createEvent).toHaveBeenCalledTimes(1);
  });

  test("should not send if no metrics collected", () => {
    const ext = extension();
    const mockClient = {
      createEvent: vi.fn().mockReturnValue({ type: "web-vitals" }),
      notify: vi.fn().mockResolvedValue(undefined),
    } as any;

    ext.onSetup!(mockClient);

    vi.runAllTimers();

    Object.defineProperty(document, "visibilityState", {
      value: "hidden",
      writable: true,
      configurable: true,
    });
    document.dispatchEvent(new Event("visibilitychange"));

    expect(mockClient.createEvent).not.toHaveBeenCalled();
  });
});
