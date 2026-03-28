import { describe, expect, test } from "vitest";

import { parseUrl, replace } from "../src/mixin";

describe("@ohbug/utils/mixin", () => {
  describe("replace", () => {
    test("returns undefined if name does not exist in source", () => {
      const source = { foo: "bar" };
      const result = replace(source, "baz", () => "replaced");

      expect(result).toBeUndefined();
      expect(source.foo).toBe("bar");
    });

    test("replaces the property using the behavior function", () => {
      const source = { foo: { name: "original" } };
      replace(source, "foo", () => ({ name: "replaced" }));

      expect(source.foo.name).toBe("replaced");
    });

    test("returns the original value", () => {
      const original = { name: "original" };
      const source = { foo: original };
      const returned = replace(source, "foo", () => ({ name: "replaced" }));

      expect(returned).toBe(original);
    });

    test("passes the original value to behavior", () => {
      const source = { count: 5 };
      replace(source, "count", (original) => original * 2);

      expect(source.count).toBe(10);
    });
  });

  describe("parseUrl", () => {
    test("parses a simple URL correctly", () => {
      expect(parseUrl("http://localhost:1234/bar")).toEqual({
        host: "localhost:1234",
        path: "/bar",
        protocol: "http",
        relative: "/bar",
      });
    });

    test("parses URL with query string", () => {
      expect(parseUrl("https://example.com/path?foo=1&bar=2")).toEqual({
        host: "example.com",
        path: "/path",
        protocol: "https",
        relative: "/path?foo=1&bar=2",
      });
    });

    test("parses URL with fragment", () => {
      expect(parseUrl("https://example.com/path#section")).toEqual({
        host: "example.com",
        path: "/path",
        protocol: "https",
        relative: "/path#section",
      });
    });

    test("parses URL with query and fragment", () => {
      expect(parseUrl("https://example.com/path?q=1#hash")).toEqual({
        host: "example.com",
        path: "/path",
        protocol: "https",
        relative: "/path?q=1#hash",
      });
    });

    test("returns empty object for non-string input", () => {
      // @ts-expect-error testing non-string
      expect(parseUrl(undefined)).toEqual({});
      // @ts-expect-error testing non-string
      expect(parseUrl(1)).toEqual({});
      // @ts-expect-error testing non-string
      expect(parseUrl(null)).toEqual({});
    });
  });
});
