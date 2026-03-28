import { describe, expect, test, vi } from "vitest";

import { Client } from "../src/client";
import { Event, createEvent, handleEventCreated, isEvent } from "../src/event";
import { defineExtension } from "../src/extension";
import { apiKey, getValues } from "./utils";

describe("@ohbug/core/event", () => {
  describe("isEvent()", () => {
    test("returns true for ohbug events", () => {
      const client = new Client(getValues());
      const event = client.createEvent({
        category: "error",
        type: "exception",
        detail: "test",
      });
      expect(isEvent(event)).toBe(true);
    });

    test("returns false for non-events", () => {
      expect(isEvent("string")).toBe(false);
      expect(isEvent(null)).toBe(false);
      expect(isEvent(undefined)).toBe(false);
      expect(isEvent({})).toBe(false);
      expect(isEvent({ __isOhbugEvent: false })).toBe(false);
    });
  });

  describe("Event class", () => {
    function makeClient(overrides?: any) {
      return new Client(getValues({ apiKey, ...overrides }));
    }

    test("toJSON returns serializable object without __client", () => {
      const client = makeClient();
      const event = client.createEvent({
        category: "error",
        type: "test",
        detail: "detail",
      });
      const json = (event as any).toJSON();
      expect(json).not.toHaveProperty("__client");
      expect(json).toHaveProperty("apiKey", apiKey);
      expect(json).toHaveProperty("type", "test");
      expect(json).toHaveProperty("detail", "detail");
      expect(json).toHaveProperty("category", "error");
      expect(json).toHaveProperty("sdk");
      expect(json).toHaveProperty("device");
      expect(json).toHaveProperty("timestamp");
    });

    test("__isOhbugEvent getter returns true", () => {
      const client = makeClient();
      const event = client.createEvent({
        category: "error",
        type: "test",
        detail: "test",
      });
      expect((event as any).__isOhbugEvent).toBe(true);
    });

    describe("addAction", () => {
      test("adds action to event actions", () => {
        const client = makeClient();
        const event = client.createEvent({
          category: "error",
          type: "test",
          detail: "test",
        })!;
        const ts = new Date().toISOString();
        event.addAction("click", { x: 1 }, "user", ts);
        expect(event.actions!.length).toBeGreaterThan(0);
      });

      test("respects maxActions from client config", () => {
        const client = makeClient({ maxActions: 2 });
        const event = client.createEvent({
          category: "error",
          type: "test",
          detail: "test",
        })!;
        event.addAction("a", {}, "t");
        event.addAction("b", {}, "t");
        event.addAction("c", {}, "t");
        // The first action should have been shifted out
        const messages = event.actions!.map((a: any) => a.message);
        expect(messages).toContain("b");
        expect(messages).toContain("c");
      });

      test("does not add action when maxActions is 0", () => {
        const client = makeClient({ maxActions: 0 });
        const event = client.createEvent({
          category: "error",
          type: "test",
          detail: "test",
        })!;
        const initialLength = event.actions!.length;
        event.addAction("a", {}, "t");
        expect(event.actions!.length).toBe(initialLength);
      });

      test("handles non-string message and type", () => {
        const client = makeClient();
        const event = client.createEvent({
          category: "error",
          type: "test",
          detail: "test",
        })!;
        // @ts-expect-error testing non-string
        event.addAction(123, null, undefined);
        const last = event.actions![event.actions!.length - 1];
        expect(last.message).toBe("");
        expect(last.data).toEqual({});
        expect(last.type).toBe("");
      });
    });

    describe("getUser / setUser", () => {
      test("getUser returns user", () => {
        const client = makeClient({ user: { id: 1, name: "test" } });
        const event = client.createEvent({
          category: "error",
          type: "test",
          detail: "test",
        })!;
        expect(event.getUser()).toEqual({ id: 1, name: "test" });
      });

      test("setUser merges user data", () => {
        const client = makeClient({ user: { id: 1 } });
        const event = client.createEvent({
          category: "error",
          type: "test",
          detail: "test",
        })!;
        const result = event.setUser({ name: "new" });
        expect(result).toEqual({ id: 1, name: "new" });
        expect(event.getUser()).toEqual({ id: 1, name: "new" });
      });

      test("setUser returns undefined for invalid input", () => {
        const errorSpy = vi.spyOn(console, "error").mockImplementation(() => {});
        const client = makeClient();
        const event = client.createEvent({
          category: "error",
          type: "test",
          detail: "test",
        })!;
        // @ts-expect-error non-object
        expect(event.setUser("invalid")).toBeUndefined();
        errorSpy.mockRestore();
      });

      test("setUser returns undefined when object has more than 6 keys", () => {
        const errorSpy = vi.spyOn(console, "error").mockImplementation(() => {});
        const client = makeClient();
        const event = client.createEvent({
          category: "error",
          type: "test",
          detail: "test",
        })!;
        const bigUser = { a: 1, b: 2, c: 3, d: 4, e: 5, f: 6, g: 7 } as any;
        expect(event.setUser(bigUser)).toBeUndefined();
        errorSpy.mockRestore();
      });
    });

    describe("metadata", () => {
      test("addMetadata / getMetadata / deleteMetadata", () => {
        const client = makeClient();
        const event = client.createEvent({
          category: "error",
          type: "test",
          detail: "test",
        })!;
        event.addMetadata("section", { key: "value" });
        expect(event.getMetadata("section")).toEqual({ key: "value" });
        event.deleteMetadata("section");
        expect(event.getMetadata("section")).toBeUndefined();
      });
    });
  });

  describe("createEvent()", () => {
    test("creates event with proper values object", () => {
      const client = new Client(getValues());
      const event = createEvent(
        { category: "error", type: "testType", detail: { msg: "hi" } },
        client,
      );
      expect(event.type).toBe("testType");
      expect(event.category).toBe("error");
      expect(event.detail).toEqual({ msg: "hi" });
    });

    test("wraps non-standard value as unknownError", () => {
      const client = new Client(getValues());
      const event = createEvent("just a string" as any, client);
      expect(event.type).toBe("unknownError");
      expect(event.category).toBe("error");
      expect(event.detail).toBe("just a string");
    });

    test("defaults category to error when not provided", () => {
      const client = new Client(getValues());
      const event = createEvent({ type: "myType", detail: "data" } as any, client);
      expect(event.category).toBe("error");
    });
  });

  describe("handleEventCreated()", () => {
    test("returns event when no hooks exist", () => {
      const client = new Client(getValues());
      const event = createEvent({ category: "error", type: "test", detail: "test" }, client);
      const result = handleEventCreated(event, client);
      expect(result).toBe(event);
    });

    test("passes event through onEvent hooks", () => {
      const onEvent = vi.fn((e: any) => e);
      const client = new Client(getValues({ apiKey, onEvent }));
      const event = createEvent({ category: "error", type: "test", detail: "test" }, client);
      const result = handleEventCreated(event, client);
      expect(onEvent).toHaveBeenCalledTimes(1);
      expect(result).toBe(event);
    });

    test("returns null when a hook returns null", () => {
      const onEvent = vi.fn(() => null);
      const client = new Client(getValues({ apiKey, onEvent }));
      const event = createEvent({ category: "error", type: "test", detail: "test" }, client);
      const result = handleEventCreated(event, client);
      expect(result).toBeNull();
    });

    test("chains multiple hooks from extensions", () => {
      const hook1 = vi.fn((e: any) => e);
      const hook2 = vi.fn((e: any) => e);
      const client = new Client(getValues({ apiKey, onEvent: hook1 }));
      const ext = defineExtension({ name: "test", onEvent: hook2 });
      client.use(ext);

      const event = createEvent({ category: "error", type: "test", detail: "test" }, client);
      handleEventCreated(event, client);
      expect(hook1).toHaveBeenCalledTimes(1);
      expect(hook2).toHaveBeenCalledTimes(1);
    });

    test("subsequent hooks are not called after null", () => {
      const hook1 = vi.fn(() => null);
      const hook2 = vi.fn((e: any) => e);
      const client = new Client(getValues({ apiKey, onEvent: hook1 }));
      const ext = defineExtension({ name: "test", onEvent: hook2 });
      client.use(ext);

      const event = createEvent({ category: "error", type: "test", detail: "test" }, client);
      const result = handleEventCreated(event, client);
      expect(result).toBeNull();
      expect(hook2).not.toHaveBeenCalled();
    });
  });

  describe("Event constructor", () => {
    test("initializes metadata to empty object when not provided", () => {
      const event = new Event({
        apiKey: "key",
        timestamp: new Date().toISOString(),
        type: "test",
        sdk: { platform: "test", version: "0" },
        detail: "d",
        device: {},
      } as any);
      expect(event.metadata).toEqual({});
    });
  });
});
