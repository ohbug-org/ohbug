import { describe, expect, test } from "vitest";

import { getGlobal, getOhbugObject, isBrowser, isNode } from "../src/get";

describe("@ohbug/utils/get", () => {
  describe("getGlobal", () => {
    test("should return the global object (window in jsdom)", () => {
      const global = getGlobal();
      expect(global).toEqual(window);
    });
  });

  describe("getOhbugObject", () => {
    test("returns __OHBUG__ when it exists", () => {
      const mockObj = { client: {} as any };
      (window as any).__OHBUG__ = mockObj;

      const result = getOhbugObject();
      expect(result).toBe(mockObj);

      delete (window as any).__OHBUG__;
    });

    test("throws when __OHBUG__ does not exist", () => {
      delete (window as any).__OHBUG__;

      expect(() => getOhbugObject()).toThrow("Failed to get `OhbugObject`");
    });
  });

  describe("isNode", () => {
    test("returns false in jsdom (browser-like) environment", () => {
      // jsdom has both globalThis and window defined
      expect(isNode()).toBe(false);
    });
  });

  describe("isBrowser", () => {
    test("returns true in jsdom environment", () => {
      expect(isBrowser()).toBe(true);
    });
  });
});
