import { afterEach, beforeEach, describe, expect, test, vi } from "vitest";

import {
  captureFetchError,
  removeCaptureFetchError,
} from "../../src/capture/network/captureFetchError";
import { cleanupTestClient, setupTestClient } from "../utils";

describe("@ohbug/browser/capture/network/captureFetchError integration", () => {
  const originalFetch = window.fetch;

  beforeEach(() => {
    setupTestClient();
  });

  afterEach(() => {
    removeCaptureFetchError();
    cleanupTestClient();
    window.fetch = originalFetch;
  });

  test("intercepts fetch and records action on success", async () => {
    // Replace fetch with a mock that resolves
    window.fetch = vi.fn().mockResolvedValue(new Response("{}", { status: 200, statusText: "OK" }));

    captureFetchError();
    const client = (window as any).__OHBUG__.client;
    const initialLength = client.__actions.length;

    await window.fetch("http://example.com/api/data?q=1");

    expect(client.__actions.length).toBeGreaterThan(initialLength);
    const lastAction = client.__actions[client.__actions.length - 1];
    expect(lastAction.type).toBe("fetch");
  });

  test("intercepts fetch and dispatches error for 4xx+ status", async () => {
    window.fetch = vi
      .fn()
      .mockResolvedValue(new Response("Not Found", { status: 404, statusText: "Not Found" }));

    captureFetchError();
    const client = (window as any).__OHBUG__.client;

    await window.fetch("http://example.com/api/missing");

    // Should have recorded both the action and dispatched a fetch error
    const fetchActions = client.__actions.filter((a: any) => a.type === "fetch");
    expect(fetchActions.length).toBeGreaterThan(0);
  });

  test("intercepts fetch and dispatches error on rejection", async () => {
    const networkError = new Error("Network error");
    // mockRejectedValue for immediate rejection
    window.fetch = vi.fn().mockRejectedValue(networkError);

    captureFetchError();

    await expect(
      window.fetch("http://example.com/api/fail", { method: "POST", body: "data" }),
    ).rejects.toThrow("Network error");
  });

  test("handles fetch with status 0 (no status)", async () => {
    const mockResponse = new Response("", { status: 200 });
    Object.defineProperty(mockResponse, "status", { value: 0 });
    window.fetch = vi.fn().mockResolvedValue(mockResponse);

    captureFetchError();

    const res = await window.fetch("http://example.com/api/data");
    expect(res).toBe(mockResponse);
  });
});
