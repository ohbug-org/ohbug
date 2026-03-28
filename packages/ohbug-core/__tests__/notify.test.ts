import { describe, expect, test, vi } from "vitest";

import { Client } from "../src/client";
import { defineExtension } from "../src/extension";
import { notify } from "../src/notify";
import { apiKey, getValues } from "./utils";

describe("@ohbug/core/notify", () => {
  test("returns null when event is null", async () => {
    const client = new Client(getValues());
    const result = await notify(null, client);
    expect(result).toBeNull();
  });

  test("calls the notifier with the event", async () => {
    const notifierFn = vi.fn(async (event: any) => event);
    const client = new Client(getValues({ apiKey }));
    // Replace the notifier
    Object.defineProperty(client, "__notifier", { value: notifierFn });

    const event = client.createEvent({
      category: "error",
      type: "test",
      detail: "test detail",
    });

    await notify(event, client);
    expect(notifierFn).toHaveBeenCalledTimes(1);
    expect(notifierFn).toHaveBeenCalledWith(event);
  });

  test("calls onNotify hooks after notification", async () => {
    const onNotify = vi.fn();
    const extensionOnNotify = vi.fn();
    const client = new Client(getValues({ apiKey, onNotify }));
    const ext = defineExtension({ name: "test", onNotify: extensionOnNotify });
    client.use(ext);

    const event = client.createEvent({
      category: "error",
      type: "test",
      detail: "test",
    });

    await notify(event, client);
    expect(onNotify).toHaveBeenCalledTimes(1);
    expect(extensionOnNotify).toHaveBeenCalledTimes(1);
  });

  test("catches and logs notifier errors", async () => {
    const errorSpy = vi.spyOn(console, "error").mockImplementation(() => {});
    const client = new Client(getValues({ apiKey }));
    const error = new Error("notifier failed");
    Object.defineProperty(client, "__notifier", {
      value: async () => {
        throw error;
      },
    });

    const event = client.createEvent({
      category: "error",
      type: "test",
      detail: "test",
    });

    const result = await notify(event, client);
    expect(result).toBeUndefined();
    expect(errorSpy).toHaveBeenCalledWith(error);
    errorSpy.mockRestore();
  });
});
