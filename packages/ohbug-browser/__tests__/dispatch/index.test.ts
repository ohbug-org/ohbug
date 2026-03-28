import { describe, expect, test } from "vitest";

import { networkDispatcher, scriptDispatcher } from "../../src/dispatch";

describe("@ohbug/browser/dispatch/index", () => {
  test("re-exports scriptDispatcher", () => {
    expect(typeof scriptDispatcher).toBe("function");
  });

  test("re-exports networkDispatcher", () => {
    expect(typeof networkDispatcher).toBe("function");
  });
});
