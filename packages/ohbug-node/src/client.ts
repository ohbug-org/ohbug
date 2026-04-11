import { Client } from "@ohbug/core";
import type { OhbugClient, OhbugConfig, OhbugSDK } from "@ohbug/types";
import { getGlobal } from "@ohbug/utils";

import { destroy } from "./destroy";
import { device } from "./device";
import { extension } from "./extension";
import { notifier } from "./notifier";
import { version } from "./version";

interface OhbugNodeClient {
  __client: OhbugClient | null;
  setup: (config: OhbugConfig) => OhbugClient;
}

function createClient(config: OhbugConfig, handleDestroy: () => void) {
  const global = getGlobal<typeof globalThis>();

  const sdk: OhbugSDK = {
    platform: "ohbug-node",
    version,
  };
  const client = new Client({
    sdk,
    config,
    device,
    notifier: config.notifier ?? notifier,
    destroy: handleDestroy,
  });

  global.__OHBUG__ = { client };
  client.use(extension);
  client.__logger.info(`@ohbug/node: Detected Ohbug v${version}`);
  return client;
}

export const NodeClient: OhbugNodeClient = {
  __client: null,
  setup(config: OhbugConfig) {
    function destroyClient() {
      const global = getGlobal<typeof globalThis>();

      destroy();
      NodeClient.__client = null;
      // @ts-expect-error noop
      global.__OHBUG__ = undefined;
    }

    if (NodeClient.__client) {
      NodeClient.__client.__logger?.warn("setup() has been called. Ignored.");
      return NodeClient.__client;
    }

    NodeClient.__client = createClient(config, destroyClient);
    return NodeClient.__client;
  },
};
