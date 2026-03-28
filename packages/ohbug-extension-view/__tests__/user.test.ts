import { afterEach, beforeEach, describe, expect, test, vi } from "vitest";

import { LocalStorageWithExpires } from "../src/user";

const NAME = "OhbugExtensionViewUV";

describe("@ohbug/extension-view/user", () => {
  beforeEach(() => {
    localStorage.clear();
    vi.useFakeTimers();
    vi.setSystemTime(new Date("2025-06-15T12:00:00Z"));
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  describe("LocalStorageWithExpires", () => {
    test("setItem should store value with expiry", () => {
      LocalStorageWithExpires.setItem("key1", "hello");
      const raw = localStorage.getItem("key1");
      expect(raw).not.toBeNull();
      const parsed = JSON.parse(raw!);
      expect(parsed.value).toBe("hello");
      expect(parsed.expiry).toBeDefined();
    });

    test("getItem should return value when not expired", () => {
      LocalStorageWithExpires.setItem("key1", "hello");
      const result = LocalStorageWithExpires.getItem("key1");
      expect(result).toBe("hello");
    });

    test("getItem should return null when expired", () => {
      LocalStorageWithExpires.setItem("key1", "hello");
      // Advance 31 days
      vi.advanceTimersByTime(31 * 24 * 3600 * 1000);
      const result = LocalStorageWithExpires.getItem("key1");
      expect(result).toBeNull();
      // Should also be removed from storage
      expect(localStorage.getItem("key1")).toBeNull();
    });

    test("getItem should return null for non-existent key", () => {
      const result = LocalStorageWithExpires.getItem("nonexistent");
      expect(result).toBeNull();
    });

    test("getItem should handle corrupted JSON gracefully", () => {
      localStorage.setItem("corrupt", "not-json{{{");
      const result = LocalStorageWithExpires.getItem("corrupt");
      expect(result).toBeNull();
      // Corrupted data should be cleaned up
      expect(localStorage.getItem("corrupt")).toBeNull();
    });

    test("removeItem should remove the key", () => {
      LocalStorageWithExpires.setItem("key1", "hello");
      LocalStorageWithExpires.removeItem("key1");
      expect(localStorage.getItem("key1")).toBeNull();
    });

    test("should store complex values", () => {
      const obj = { a: 1, b: [2, 3] };
      LocalStorageWithExpires.setItem("complex", obj);
      const result = LocalStorageWithExpires.getItem("complex");
      expect(result).toEqual(obj);
    });
  });

  describe("createUserView", () => {
    test("should send user view when no previous record exists", async () => {
      const mockNotify = vi.fn().mockResolvedValue(undefined);
      const mockCreateEvent = vi.fn().mockReturnValue({});
      const mockClient = { createEvent: mockCreateEvent, notify: mockNotify };

      // Mock getOhbugObject
      (globalThis as any).__OHBUG__ = { client: mockClient };

      const { default: createUserView } = await import("../src/user");
      createUserView("/test");

      expect(mockCreateEvent).toHaveBeenCalledWith({
        category: "view",
        type: "userView",
        detail: { path: "/test" },
      });
      expect(mockNotify).toHaveBeenCalled();

      // Should also persist in storage
      expect(LocalStorageWithExpires.getItem(NAME)).toBeDefined();
    });

    test("should not send user view if already recorded today", async () => {
      const mockNotify = vi.fn().mockResolvedValue(undefined);
      const mockCreateEvent = vi.fn().mockReturnValue({});
      const mockClient = { createEvent: mockCreateEvent, notify: mockNotify };

      (globalThis as any).__OHBUG__ = { client: mockClient };

      const { default: createUserView } = await import("../src/user");

      // First call sets the record
      createUserView("/test");
      mockNotify.mockClear();
      mockCreateEvent.mockClear();

      // Second call same day should NOT send
      createUserView("/test");
      expect(mockCreateEvent).not.toHaveBeenCalled();
    });

    test("should send user view when last record is from yesterday", async () => {
      const mockNotify = vi.fn().mockResolvedValue(undefined);
      const mockCreateEvent = vi.fn().mockReturnValue({});
      const mockClient = { createEvent: mockCreateEvent, notify: mockNotify };

      (globalThis as any).__OHBUG__ = { client: mockClient };

      const { default: createUserView } = await import("../src/user");

      // First call
      createUserView("/test");
      mockNotify.mockClear();
      mockCreateEvent.mockClear();

      // Advance to next day
      vi.advanceTimersByTime(25 * 3600 * 1000);

      // Should send again
      createUserView("/test2");
      expect(mockCreateEvent).toHaveBeenCalledWith({
        category: "view",
        type: "userView",
        detail: { path: "/test2" },
      });
    });
  });
});
