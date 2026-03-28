import type { OhbugMetadata, OhbugUser } from "@ohbug/types";
import { isObject, isPromise } from "@ohbug/utils";
import { describe, expect, test, vi } from "vitest";

import { Action } from "../src/action";
import { Client } from "../src/client";
import { isEvent } from "../src/event";
import { defineExtension } from "../src/extension";
import { apiKey, getValues } from "./utils";

describe("@ohbug/core/client", () => {
  describe("constructor", () => {
    const logger = {
      log: vi.fn(),
      warn: vi.fn(),
      info: vi.fn(),
      error: vi.fn(),
    };
    test("an exception should be thrown when entering wrong parameter", () => {
      // @ts-expect-error no apiKey
      expect(() => new Client()).toThrow();
      const client = new Client(getValues({ apiKey: "", logger }));
      expect(client).toBeTruthy();
      expect(logger.warn).toBeCalledTimes(1);
    });
  });

  describe("use()", () => {
    test("should be support load extensions", () => {
      const client = new Client(getValues());
      const extension = defineExtension({
        name: "test_extension",
        onSetup: (_client) => {
          expect(_client).toEqual(client);
        },
      });
      client.use(extension);
      expect(client.__extensions).toEqual([extension]);
    });

    test("returns the client for chaining", () => {
      const client = new Client(getValues());
      const ext = defineExtension({ name: "a" });
      const result = client.use(ext);
      expect(result).toBe(client);
    });
  });

  describe("destroy()", () => {
    test("calls the destroy function when provided", () => {
      const destroyFn = vi.fn();
      const infoSpy = vi.spyOn(console, "info").mockImplementation(() => {});
      const client = new Client({ ...getValues(), destroy: destroyFn });
      client.destroy();
      expect(destroyFn).toHaveBeenCalledTimes(1);
      infoSpy.mockRestore();
    });

    test("calls onDestroy on extensions", () => {
      const onDestroy = vi.fn();
      const infoSpy = vi.spyOn(console, "info").mockImplementation(() => {});
      const client = new Client({ ...getValues(), destroy: () => {} });
      const ext = defineExtension({ name: "test", onDestroy });
      client.use(ext);
      client.destroy();
      expect(onDestroy).toHaveBeenCalledTimes(1);
      expect(onDestroy).toHaveBeenCalledWith(client);
      infoSpy.mockRestore();
    });

    test("does nothing when destroy function is not provided", () => {
      const client = new Client(getValues());
      // should not throw
      expect(() => client.destroy()).not.toThrow();
    });
  });

  describe("createEvent()", () => {
    test("should be get an event", () => {
      const client = new Client(getValues());
      const event = client.createEvent({
        category: "error",
        type: "exception",
        detail: "should be get an event",
      });
      expect(isEvent(event)).toBe(true);
      expect(event).toBeTruthy();
      expect(isObject(event)).toBe(true);
    });

    test("should be trigger all onEvent hooks", () => {
      const hooks = {
        clientOnEvent: vi.fn((e: any) => e),
        extensionOnEvent: vi.fn((e: any) => e),
      };
      const client = new Client(getValues({ apiKey, onEvent: hooks.clientOnEvent }));
      const extension = defineExtension({
        name: "test_extension",
        onEvent: hooks.extensionOnEvent,
      });
      client.use(extension);

      client.createEvent({
        category: "error",
        type: "exception",
        detail: "should be trigger all onEvent hooks",
      });

      expect(hooks.clientOnEvent).toBeCalledTimes(1);
      expect(hooks.extensionOnEvent).toBeCalledTimes(1);
    });
  });

  describe("notify()", () => {
    test("should be return a promise", () => {
      const client = new Client(getValues());
      const result = client.notify("should be return a promise");
      expect(isPromise(result)).toBe(true);
    });

    test("should be called beforeNotify", () => {
      const beforeNotify = vi.fn();
      const client = new Client(getValues());
      void client.notify("should be package events", beforeNotify);
      expect(beforeNotify).toBeCalledTimes(1);
    });

    test("should be package events", () => {
      const client = new Client(getValues());
      void client.notify("should be package events", (event) => {
        expect(isEvent(event)).toBe(true);
        return event;
      });
    });

    test("passes an existing event directly without creating a new one", async () => {
      const client = new Client(getValues());
      const event = client.createEvent({
        category: "error",
        type: "test",
        detail: "existing event",
      });
      // notify with an already-created event
      await client.notify(event);
    });

    test("should be trigger all onNotify hooks", async () => {
      const hooks = {
        clientNotified: vi.fn(),
        extensionNotified: vi.fn(),
      };
      const client = new Client(getValues({ apiKey, onNotify: hooks.clientNotified }));
      const extension = defineExtension({
        name: "test_extension",
        onNotify: hooks.extensionNotified,
      });
      client.use(extension);

      const event = client.createEvent({
        category: "error",
        type: "exception",
        detail: "should be trigger all onNotify hooks",
      });
      await client.notify(event);

      expect(hooks.clientNotified).toBeCalledTimes(1);
      expect(hooks.extensionNotified).toBeCalledTimes(1);
    });
  });

  describe("addAction()", () => {
    test("action should be added to actions correctly", () => {
      const client = new Client(getValues());
      const now = new Date().toISOString();
      const action = {
        message: "action should be added to actions correctly",
        data: { a: 1 },
        type: "test",
        timestamp: now,
      };
      expect(client.__actions.length).toBe(0);
      client.addAction(action.message, action.data, action.type, action.timestamp);
      expect(client.__actions.length).toBe(1);
      expect(client.__actions[0]).toEqual(
        new Action(action.message, action.data, action.type, action.timestamp),
      );
    });

    test("once the threshold is reached, delete the oldest actions", () => {
      const maxActions = 5;
      const client = new Client(getValues({ apiKey, maxActions }));
      const now = new Date().toISOString();
      const action = {
        message: "once the threshold is reached, delete the oldest actions",
        type: "test",
        timestamp: now,
      };
      expect(client.__actions.length).toBe(0);
      for (let i = 1; i <= maxActions; i += 1) {
        client.addAction(action.message, { index: i }, action.type, action.timestamp);
      }
      expect(client.__actions.length).toBe(maxActions);
      expect(client.__actions[client.__actions.length - 1]).toEqual(
        new Action(action.message, { index: 5 }, action.type, action.timestamp),
      );
      client.addAction(action.message, { index: 6 }, action.type, action.timestamp);
      expect(client.__actions[0]).toEqual(
        new Action(action.message, { index: 2 }, action.type, action.timestamp),
      );
      expect(client.__actions[client.__actions.length - 1]).toEqual(
        new Action(action.message, { index: 6 }, action.type, action.timestamp),
      );
    });

    test("handles non-string message and type gracefully", () => {
      const client = new Client(getValues());
      // @ts-expect-error testing non-string
      client.addAction(123, null, undefined);
      expect(client.__actions.length).toBe(1);
      const action = client.__actions[0];
      expect(action.message).toBe("");
      expect(action.data).toEqual({});
      expect(action.type).toBe("");
    });

    test("maxActions support settings to 0", () => {
      const maxActions = 0;
      const client = new Client(getValues({ apiKey, maxActions }));

      const now = new Date().toISOString();
      const action = {
        message: "once the threshold is reached, delete the oldest actions",
        type: "test",
        timestamp: now,
      };
      expect(client.__actions.length).toBe(0);
      client.addAction(action.message, { index: 1 }, action.type, action.timestamp);
      expect(client.__actions.length).toBe(0);
      client.addAction(action.message, { index: 2 }, action.type, action.timestamp);
      expect(client.__actions.length).toBe(0);
    });
  });

  describe("user", () => {
    test("should be get the user information correctly", () => {
      const user: OhbugUser = {
        id: 1,
        name: "yueban",
        email: "yueban@ohbug.net",
      };
      const client = new Client(getValues({ apiKey, user }));
      expect(client.getUser()).toEqual(user);
    });

    test("should be set the user information correctly", () => {
      const user: OhbugUser = {
        id: 1,
        name: "yueban",
        email: "yueban@ohbug.net",
      };
      const user2: OhbugUser = {
        id: 2,
        name: "yueban2",
        email: "yueban@ohbug.net",
      };
      const client = new Client(getValues({ apiKey, user }));
      expect(client.setUser(user2)).toEqual(user2);
      expect(client.getUser()).toEqual(user2);
    });

    test("setUser returns undefined for invalid input (non-object)", () => {
      const warnSpy = vi.spyOn(console, "warn").mockImplementation(() => {});
      const client = new Client(getValues({ apiKey }));
      // @ts-expect-error testing invalid input
      expect(client.setUser("invalid")).toBeUndefined();
      warnSpy.mockRestore();
    });

    test("setUser returns undefined when object has more than 6 attributes", () => {
      const warnSpy = vi.spyOn(console, "warn").mockImplementation(() => {});
      const client = new Client(getValues({ apiKey }));
      const bigUser = { a: 1, b: 2, c: 3, d: 4, e: 5, f: 6, g: 7 } as any;
      expect(client.setUser(bigUser)).toBeUndefined();
      warnSpy.mockRestore();
    });

    test("getUser returns undefined when no user is set", () => {
      const client = new Client(getValues({ apiKey }));
      expect(client.getUser()).toBeUndefined();
    });
  });

  describe("metadata", () => {
    test("should be set the metadata correctly", () => {
      const metadata: OhbugMetadata = {
        organization: {
          name: "ohbug",
          platform: "test",
        },
      };
      const client = new Client(
        getValues({
          apiKey,
          metadata,
        }),
      );
      expect(client.__metadata.organization).toEqual(metadata.organization);
    });

    test("should be add the metadata correctly", () => {
      const metadata: OhbugMetadata = {
        organization: {
          name: "ohbug",
          platform: "test",
        },
      };
      const client = new Client(getValues());
      client.addMetadata("organization", {
        name: "ohbug",
        platform: "test",
      });
      expect(client.__metadata.organization).toEqual(metadata.organization);
    });

    test("should be get the metadata correctly", () => {
      const metadata: OhbugMetadata = {
        organization: {
          name: "ohbug",
          platform: "test",
        },
      };
      const client = new Client(getValues());
      client.addMetadata("organization", {
        name: "ohbug",
        platform: "test",
      });
      expect(client.getMetadata("organization")).toEqual(metadata.organization);
    });

    test("should be delete the metadata correctly", () => {
      const metadata: OhbugMetadata = {
        organization: {
          name: "ohbug",
          platform: "test",
        },
      };
      const client = new Client(getValues({ apiKey, metadata }));
      client.deleteMetadata("organization");
      expect(client.getMetadata("organization")).toBeUndefined();
      expect(Object.keys(client.__metadata).length).toBe(0);
    });
  });
});
