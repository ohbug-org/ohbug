import { afterEach, describe, expect, test, vi } from "vitest";

import { BrowserClient } from "../src/client";

const apiKey = "BROWSER_CLIENT_TEST_KEY";

describe("@ohbug/browser/client", () => {
  afterEach(() => {
    // Reset state without calling destroy (which breaks jsdom addEventListener)
    BrowserClient.__client = null;
    delete (window as any).__OHBUG__;
  });

  test("setup creates a client and sets global __OHBUG__", () => {
    const infoSpy = vi.spyOn(console, "info").mockImplementation(() => {});
    const client = BrowserClient.setup({ apiKey });
    expect(client).toBeTruthy();
    expect(BrowserClient.__client).toBe(client);
    expect((window as any).__OHBUG__).toBeDefined();
    expect((window as any).__OHBUG__.client).toBe(client);
    infoSpy.mockRestore();
  });

  test("setup returns existing client if already initialized (warn)", () => {
    const infoSpy = vi.spyOn(console, "info").mockImplementation(() => {});
    const warnSpy = vi.spyOn(console, "warn").mockImplementation(() => {});

    const client1 = BrowserClient.setup({ apiKey });
    const client2 = BrowserClient.setup({ apiKey });
    expect(client2).toBe(client1);
    expect(warnSpy).toHaveBeenCalled();

    infoSpy.mockRestore();
    warnSpy.mockRestore();
  });

  test("destroy cleans up client and global __OHBUG__", () => {
    const infoSpy = vi.spyOn(console, "info").mockImplementation(() => {});
    const client = BrowserClient.setup({ apiKey });

    // Call destroy through the client
    client.destroy();

    expect(BrowserClient.__client).toBeNull();
    expect((window as any).__OHBUG__).toBeUndefined();
    infoSpy.mockRestore();
  });
});
