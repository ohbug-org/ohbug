import { Client } from "@ohbug/core";
import type { OhbugClient, OhbugConfig } from "@ohbug/types";

import { device } from "../src/device";
import { version } from "../src/version";

/**
 * Create a Node client for testing without triggering
 * handleCapture (which registers process listeners).
 */
export function setupTestClient(config: Partial<OhbugConfig> = {}): OhbugClient {
  const client = new Client({
    sdk: { platform: "ohbug-node", version },
    config: { apiKey: "TEST_KEY", ...config } as OhbugConfig,
    device,
    notifier: async (event: any) => event,
  });
  (globalThis as any).__OHBUG__ = { client };
  return client;
}

export function cleanupTestClient(): void {
  delete (globalThis as any).__OHBUG__;
}
