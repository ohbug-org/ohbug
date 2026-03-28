import { describe, expect, test } from "vitest";

import { addMetadata, deleteMetadata, getMetadata } from "../../src/lib/metadata";

describe("@ohbug/core/lib/metadata", () => {
  describe("addMetadata", () => {
    test("adds data to the map", () => {
      const map: Record<string, any> = {};
      addMetadata(map, "org", { name: "test" });
      expect(map.org).toEqual({ name: "test" });
    });

    test("does nothing when section is empty", () => {
      const map: Record<string, any> = {};
      addMetadata(map, "", { name: "test" });
      expect(Object.keys(map).length).toBe(0);
    });
  });

  describe("getMetadata", () => {
    test("returns data when section exists", () => {
      const map = { org: { name: "test" } };
      expect(getMetadata(map, "org")).toEqual({ name: "test" });
    });

    test("returns undefined when section does not exist", () => {
      const map: Record<string, any> = {};
      expect(getMetadata(map, "missing")).toBeUndefined();
    });
  });

  describe("deleteMetadata", () => {
    test("deletes and returns true when section exists", () => {
      const map: Record<string, any> = { org: { name: "test" } };
      expect(deleteMetadata(map, "org")).toBe(true);
      expect(map.org).toBeUndefined();
    });

    test("returns undefined when section does not exist", () => {
      const map: Record<string, any> = {};
      expect(deleteMetadata(map, "missing")).toBeUndefined();
    });
  });
});
