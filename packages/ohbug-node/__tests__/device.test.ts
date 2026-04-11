// @vitest-environment node
import { describe, expect, test } from "vitest";

import { device } from "../src/device";

describe("@ohbug/node/device", () => {
  test("returns runtime info", () => {
    const result = device();

    expect(result).toHaveProperty("runtime");
    expect(result).toHaveProperty("runtimeVersion");
    expect(typeof result.runtime).toBe("string");
    expect(["node", "bun"]).toContain(result.runtime);
  });

  test("returns OS info", () => {
    const result = device();

    expect(result).toHaveProperty("platform");
    expect(result).toHaveProperty("arch");
    expect(result).toHaveProperty("osType");
    expect(result).toHaveProperty("osRelease");
    expect(result).toHaveProperty("hostname");
    expect(typeof result.platform).toBe("string");
    expect(typeof result.arch).toBe("string");
  });

  test("returns process and dynamic info", () => {
    const result = device();

    expect(result).toHaveProperty("pid");
    expect(result).toHaveProperty("memoryUsage");
    expect(result).toHaveProperty("uptime");
    expect(typeof result.pid).toBe("number");
    expect(typeof result.uptime).toBe("number");
  });

  test("memoryUsage contains expected fields", () => {
    const result = device();
    const mem = result.memoryUsage as NodeJS.MemoryUsage;

    expect(mem).toHaveProperty("rss");
    expect(mem).toHaveProperty("heapTotal");
    expect(mem).toHaveProperty("heapUsed");
    expect(mem).toHaveProperty("external");
  });
});
