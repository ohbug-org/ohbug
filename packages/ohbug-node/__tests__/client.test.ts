// @vitest-environment node
import { afterEach, describe, expect, test, vi } from "vitest";

import { NodeClient } from "../src/client";

const apiKey = "NODE_CLIENT_TEST_KEY";

describe("@ohbug/node/client", () => {
  afterEach(() => {
    NodeClient.__client = null;
    delete (globalThis as any).__OHBUG__;
  });

  test("setup creates a client and sets global __OHBUG__", () => {
    const infoSpy = vi.spyOn(console, "info").mockImplementation(() => {});
    const client = NodeClient.setup({ apiKey });
    expect(client).toBeTruthy();
    expect(NodeClient.__client).toBe(client);
    expect((globalThis as any).__OHBUG__).toBeDefined();
    expect((globalThis as any).__OHBUG__.client).toBe(client);
    infoSpy.mockRestore();
  });

  test("setup returns existing client if already initialized (warn)", () => {
    const infoSpy = vi.spyOn(console, "info").mockImplementation(() => {});
    const warnSpy = vi.spyOn(console, "warn").mockImplementation(() => {});

    const client1 = NodeClient.setup({ apiKey });
    const client2 = NodeClient.setup({ apiKey });
    expect(client2).toBe(client1);
    expect(warnSpy).toHaveBeenCalled();

    infoSpy.mockRestore();
    warnSpy.mockRestore();
  });

  test("destroy cleans up client and global __OHBUG__", () => {
    const infoSpy = vi.spyOn(console, "info").mockImplementation(() => {});
    const client = NodeClient.setup({ apiKey });

    client.destroy();

    expect(NodeClient.__client).toBeNull();
    expect((globalThis as any).__OHBUG__).toBeUndefined();
    infoSpy.mockRestore();
  });
});
