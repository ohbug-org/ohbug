import { Client } from "@ohbug/core";
import type { OhbugConfig, OhbugEventWithMethods, OhbugGetDevice } from "@ohbug/types";
import { describe, expect, test, vi } from "vitest";

import { install } from "../src/install";
import type { Vue } from "../src/types";

function createMockClient(overrides?: Partial<OhbugConfig>) {
  const getDevice: OhbugGetDevice = () => ({});
  return new Client({
    sdk: { platform: "test", version: "0.0.0" },
    config: { apiKey: "TEST_KEY", ...overrides } as OhbugConfig,
    device: getDevice,
    notifier: (event: OhbugEventWithMethods<any>) => event,
  });
}

function createMockVue(): Vue {
  return {
    config: {
      errorHandler: undefined,
    },
  };
}

describe("@ohbug/vue/install", () => {
  test("sets Vue.config.errorHandler", () => {
    const client = createMockClient();
    const vue = createMockVue();

    expect(vue.config.errorHandler).toBeUndefined();
    install(client, vue);
    expect(typeof vue.config.errorHandler).toBe("function");
  });

  test("errorHandler calls client.createEvent and client.notify", () => {
    const client = createMockClient();
    const createEventSpy = vi.spyOn(client, "createEvent");
    const notifySpy = vi.spyOn(client, "notify");
    const vue = createMockVue();

    install(client, vue);

    const error = new Error("Vue error");
    const errorSpy = vi.spyOn(console, "error").mockImplementation(() => {});
    vue.config.errorHandler(
      error,
      { $root: {}, $options: { name: "TestComponent", __file: "test.vue" } },
      "render",
    );

    expect(createEventSpy).toHaveBeenCalledTimes(1);
    const eventArg = createEventSpy.mock.calls[0][0];
    expect(eventArg.type).toBe("vue");
    const detail = eventArg.detail as any;
    expect(detail.name).toBe("Error");
    expect(detail.component).toBe("TestComponent");
    expect(detail.file).toBe("test.vue");
    expect(detail.errorInfo).toBe("render");
    expect(notifySpy).toHaveBeenCalledTimes(1);

    errorSpy.mockRestore();
  });

  test("errorHandler identifies Root component", () => {
    const client = createMockClient();
    const createEventSpy = vi.spyOn(client, "createEvent");
    const vue = createMockVue();

    install(client, vue);

    const error = new Error("root error");
    const rootInstance = { $options: {} } as any;
    rootInstance.$root = rootInstance;

    const errorSpy = vi.spyOn(console, "error").mockImplementation(() => {});
    vue.config.errorHandler(error, rootInstance, "mounted");

    const eventArg = createEventSpy.mock.calls[0][0];
    expect((eventArg.detail as any).component).toBe("Root");

    errorSpy.mockRestore();
  });

  test("errorHandler calls previous errorHandler", () => {
    const client = createMockClient();
    const prevHandler = vi.fn();
    const vue = createMockVue();
    vue.config.errorHandler = prevHandler;

    install(client, vue);

    const error = new Error("test");
    const errorSpy = vi.spyOn(console, "error").mockImplementation(() => {});
    vue.config.errorHandler(error, null, "info");

    expect(prevHandler).toHaveBeenCalledTimes(1);
    expect(prevHandler).toHaveBeenCalledWith(error, null, "info");

    errorSpy.mockRestore();
  });

  test("errorHandler logs error to console", () => {
    const client = createMockClient();
    const vue = createMockVue();

    install(client, vue);

    const error = new Error("test");
    const errorSpy = vi.spyOn(console, "error").mockImplementation(() => {});
    vue.config.errorHandler(error, null, "info");

    expect(errorSpy).toHaveBeenCalledWith(error);
    errorSpy.mockRestore();
  });

  test("errorHandler handles null instance", () => {
    const client = createMockClient();
    const createEventSpy = vi.spyOn(client, "createEvent");
    const vue = createMockVue();

    install(client, vue);

    const error = new Error("test");
    const errorSpy = vi.spyOn(console, "error").mockImplementation(() => {});
    vue.config.errorHandler(error, null, "info");

    const eventArg = createEventSpy.mock.calls[0][0];
    expect((eventArg.detail as any).component).toBeUndefined();
    expect((eventArg.detail as any).props).toBeUndefined();

    errorSpy.mockRestore();
  });
});
