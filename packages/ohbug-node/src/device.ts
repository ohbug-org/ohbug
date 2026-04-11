import os from "node:os";

import type { OhbugGetDevice } from "@ohbug/types";
import { safeCall } from "@ohbug/utils";

function detectRuntime(): { name: string; version: string } {
  if (typeof process !== "undefined" && process.versions?.bun) {
    return { name: "bun", version: process.versions.bun };
  }
  return { name: "node", version: process.version };
}

// Static fields are cached — they never change during the process lifetime.
let cachedStatic: Record<string, unknown> | null = null;

function getStaticDeviceInfo() {
  if (cachedStatic) return cachedStatic;
  const runtime = detectRuntime();
  cachedStatic = {
    runtime: runtime.name,
    runtimeVersion: runtime.version,
    platform: process.platform,
    arch: process.arch,
    osType: safeCall(() => os.type(), "unknown"),
    osRelease: safeCall(() => os.release(), "unknown"),
    hostname: safeCall(() => os.hostname(), "unknown"),
    pid: process.pid,
  };
  return cachedStatic;
}

export const device: OhbugGetDevice = () => ({
  ...getStaticDeviceInfo(),
  memoryUsage: safeCall(() => process.memoryUsage(), undefined),
  uptime: safeCall(() => process.uptime(), 0),
});
