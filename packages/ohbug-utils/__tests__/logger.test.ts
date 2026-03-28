import { describe, expect, test, vi } from "vitest";

import { logger } from "../src/logger";

describe("@ohbug/utils/logger", () => {
  test("log forwards to console.log", () => {
    const spy = vi.spyOn(console, "log").mockImplementation(() => {});
    logger.log("test", 123);
    expect(spy).toHaveBeenCalledWith("test", 123);
    spy.mockRestore();
  });

  test("info forwards to console.info", () => {
    const spy = vi.spyOn(console, "info").mockImplementation(() => {});
    logger.info("info msg");
    expect(spy).toHaveBeenCalledWith("info msg");
    spy.mockRestore();
  });

  test("warn forwards to console.warn", () => {
    const spy = vi.spyOn(console, "warn").mockImplementation(() => {});
    logger.warn("warn msg");
    expect(spy).toHaveBeenCalledWith("warn msg");
    spy.mockRestore();
  });

  test("error forwards to console.error", () => {
    const spy = vi.spyOn(console, "error").mockImplementation(() => {});
    logger.error("error msg");
    expect(spy).toHaveBeenCalledWith("error msg");
    spy.mockRestore();
  });
});
