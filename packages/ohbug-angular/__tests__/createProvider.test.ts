import { Client } from "@ohbug/core";
import type { OhbugConfig, OhbugEventWithMethods, OhbugGetDevice } from "@ohbug/types";
import { describe, expect, test, vi } from "vitest";

import createProvider from "../src/createProvider";

function createMockClient() {
  const getDevice: OhbugGetDevice = () => ({});
  return new Client({
    sdk: { platform: "test", version: "0.0.0" },
    config: { apiKey: "TEST_KEY" } as OhbugConfig,
    device: getDevice,
    notifier: (event: OhbugEventWithMethods<any>) => event,
  });
}

describe("@ohbug/angular/createProvider", () => {
  test("returns provider with provide and useClass", () => {
    const client = createMockClient();
    const mockErrorHandler = {} as any;
    const result = createProvider(client, mockErrorHandler);

    expect(result).toHaveProperty("provide");
    expect(result).toHaveProperty("useClass");
    expect(result.provide).toBe(mockErrorHandler);
  });

  test("useClass handleError creates event and notifies", () => {
    const client = createMockClient();
    const createEventSpy = vi.spyOn(client, "createEvent");
    const notifySpy = vi.spyOn(client, "notify");
    const mockErrorHandler = {} as any;

    const { useClass: OhbugErrorHandler } = createProvider(client, mockErrorHandler);
    const handler = new OhbugErrorHandler();

    const error = new Error("Angular error");
    handler.handleError(error);

    expect(createEventSpy).toHaveBeenCalledTimes(1);
    const eventArg = createEventSpy.mock.calls[0][0];
    expect(eventArg.type).toBe("angular");
    expect(eventArg.category).toBe("error");
    expect((eventArg.detail as any).message).toBe("Angular error");
    expect((eventArg.detail as any).stack).toBe(error.stack);
    expect(notifySpy).toHaveBeenCalledTimes(1);
  });
});
