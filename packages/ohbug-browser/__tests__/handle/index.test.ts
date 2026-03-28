import { describe, expect, test } from "vitest";

import {
  ajaxErrorHandler,
  fetchErrorHandler,
  resourceErrorHandler,
  uncaughtErrorHandler,
  unhandledrejectionErrorHandler,
  unknownErrorHandler,
  websocketErrorHandler,
} from "../../src/handle";

describe("@ohbug/browser/handle/index", () => {
  test("re-exports all handlers", () => {
    expect(typeof ajaxErrorHandler).toBe("function");
    expect(typeof fetchErrorHandler).toBe("function");
    expect(typeof resourceErrorHandler).toBe("function");
    expect(typeof uncaughtErrorHandler).toBe("function");
    expect(typeof unhandledrejectionErrorHandler).toBe("function");
    expect(typeof unknownErrorHandler).toBe("function");
    expect(typeof websocketErrorHandler).toBe("function");
  });
});
