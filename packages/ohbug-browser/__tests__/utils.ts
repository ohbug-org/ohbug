import { Client } from "@ohbug/core";
import type { OhbugClient, OhbugConfig } from "@ohbug/types";

import { device } from "../src/device";

/**
 * Create a browser-like client for testing without triggering
 * handleCapture/replaceAddEventListener (which breaks jsdom).
 */
export function setupTestClient(config: Partial<OhbugConfig> = {}): OhbugClient {
  const client = new Client({
    sdk: { platform: "ohbug-browser", version: "__VERSION__" },
    config: { apiKey: "TEST_KEY", ...config } as OhbugConfig,
    device,
    notifier: async (event: any) => event,
  });
  (window as any).__OHBUG__ = { client };
  return client;
}

export function cleanupTestClient(): void {
  delete (window as any).__OHBUG__;
}
