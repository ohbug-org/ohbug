import { Client } from "@ohbug/core";
import type { OhbugConfig, OhbugEventWithMethods, OhbugGetDevice } from "@ohbug/types";
import { describe, expect, test } from "vitest";

import createVueClient from "../src/index";

describe("@ohbug/vue/index", () => {
  test("createVueClient returns an object with install method", () => {
    const getDevice: OhbugGetDevice = () => ({});
    const client = new Client({
      sdk: { platform: "test", version: "0.0.0" },
      config: { apiKey: "TEST_KEY" } as OhbugConfig,
      device: getDevice,
      notifier: (event: OhbugEventWithMethods<any>) => event,
    });

    const vuePlugin = createVueClient(client);
    expect(typeof vuePlugin.install).toBe("function");
  });

  test("install method calls install on the Vue app", () => {
    const getDevice: OhbugGetDevice = () => ({});
    const client = new Client({
      sdk: { platform: "test", version: "0.0.0" },
      config: { apiKey: "TEST_KEY" } as OhbugConfig,
      device: getDevice,
      notifier: (event: OhbugEventWithMethods<any>) => event,
    });

    const vuePlugin = createVueClient(client);
    const mockVue = { config: { errorHandler: undefined } };

    vuePlugin.install(mockVue as any);
    expect(typeof mockVue.config.errorHandler).toBe("function");
  });
});
