import { describe, expect, test } from "vitest";

import { getParams } from "../src/capture/network/getParams";

describe("@ohbug/browser/getParams", () => {
  test("parses a standard URL without params", () => {
    const result = getParams("https://example.com/api/data");
    expect(result.url).toBe("https://example.com/api/data");
    expect(result.params).toBeUndefined();
  });

  test("parses a standard URL with query params", () => {
    const result = getParams("https://example.com/api?foo=1&bar=2");
    expect(result.url).toBe("https://example.com/api");
    const params = JSON.parse(result.params!);
    expect(params.foo).toBe("1");
    expect(params.bar).toBe("2");
  });

  test("groups duplicate query params into array", () => {
    const result = getParams("https://example.com/api?tag=a&tag=b");
    const params = JSON.parse(result.params!);
    expect(params.tag).toEqual(["a", "b"]);
  });

  test("groups 3+ duplicate query params into array", () => {
    const result = getParams("https://example.com/api?tag=a&tag=b&tag=c");
    const params = JSON.parse(result.params!);
    expect(params.tag).toEqual(["a", "b", "c"]);
  });

  test("handles non-standard URL (fallback to string split)", () => {
    const result = getParams("/api/data?foo=1");
    expect(result.url).toBe("/api/data");
    const params = JSON.parse(result.params!);
    expect(params.foo).toBe("1");
  });

  test("handles non-standard URL without params", () => {
    const result = getParams("/api/data");
    expect(result.url).toBe("/api/data");
    expect(result.params).toBeUndefined();
  });

  test("handles websocket URLs", () => {
    const result = getParams("ws://localhost:8080/socket?token=abc");
    expect(result.url).toBe("ws://localhost:8080/socket");
    const params = JSON.parse(result.params!);
    expect(params.token).toBe("abc");
  });
});
