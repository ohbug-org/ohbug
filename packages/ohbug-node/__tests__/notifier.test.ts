// @vitest-environment node
import type { OhbugEventWithMethods } from "@ohbug/types";
import { afterEach, describe, expect, test, vi } from "vitest";

import { notifier } from "../src/notifier";
import { cleanupTestClient, setupTestClient } from "./utils";

describe("@ohbug/node/notifier", () => {
  afterEach(() => {
    cleanupTestClient();
    vi.restoreAllMocks();
  });

  test("sends POST request with JSON body via fetch", async () => {
    setupTestClient();
    const mockFetch = vi.fn().mockResolvedValue(new Response("ok"));
    vi.stubGlobal("fetch", mockFetch);

    const event = { type: "test" } as OhbugEventWithMethods<any>;
    await notifier(event);

    expect(mockFetch).toHaveBeenCalledTimes(1);
    const [url, options] = mockFetch.mock.calls[0];
    expect(url).toBe("http://localhost:6660");
    expect(options.method).toBe("POST");
    expect(options.headers["Content-Type"]).toBe("application/json;charset=UTF-8");
  });

  test("handles circular references in event data", async () => {
    setupTestClient();
    const mockFetch = vi.fn().mockResolvedValue(new Response("ok"));
    vi.stubGlobal("fetch", mockFetch);

    const circular: any = { type: "test" };
    circular.self = circular;

    await expect(notifier(circular as OhbugEventWithMethods<any>)).resolves.not.toThrow();
    expect(mockFetch).toHaveBeenCalledTimes(1);
  });

  test("uses configured endpoint", async () => {
    setupTestClient({ endpoint: "http://custom:8080/events" });
    const mockFetch = vi.fn().mockResolvedValue(new Response("ok"));
    vi.stubGlobal("fetch", mockFetch);

    const event = { type: "test" } as OhbugEventWithMethods<any>;
    await notifier(event);

    const [url] = mockFetch.mock.calls[0];
    expect(url).toBe("http://custom:8080/events");
  });

  test("logs warning when response status is not ok", async () => {
    const client = setupTestClient();
    const warnSpy = vi.spyOn(client.__logger, "warn").mockImplementation(() => {});
    const mockFetch = vi.fn().mockResolvedValue(new Response("error", { status: 500 }));
    vi.stubGlobal("fetch", mockFetch);

    const event = { type: "test" } as OhbugEventWithMethods<any>;
    await notifier(event);

    expect(warnSpy).toHaveBeenCalledWith(expect.stringContaining("500"));
    warnSpy.mockRestore();
  });

  test("propagates fetch rejection", async () => {
    setupTestClient();
    const mockFetch = vi.fn().mockRejectedValue(new Error("network error"));
    vi.stubGlobal("fetch", mockFetch);

    const event = { type: "test" } as OhbugEventWithMethods<any>;
    await expect(notifier(event)).rejects.toThrow("network error");
  });
});
