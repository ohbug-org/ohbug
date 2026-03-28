import type { OhbugGlobal, OhbugObject } from "@ohbug/types";

import { error } from "./warning";

const fallbackGlobalObject = {};
export function getGlobal<T = Window>(): T & OhbugGlobal {
  return (
    typeof window !== "undefined"
      ? window
      : typeof globalThis !== "undefined"
        ? globalThis
        : typeof self !== "undefined"
          ? self
          : fallbackGlobalObject
  ) as T & OhbugGlobal;
}

export function getOhbugObject<T = Window>(): OhbugObject {
  const global = getGlobal<T>();

  error(Boolean(global.__OHBUG__), "Failed to get `OhbugObject`, please confirm if `Ohbug.setup`");

  return global.__OHBUG__;
}

export function isNode(): boolean {
  return typeof globalThis !== "undefined" && typeof window === "undefined";
}

export function isBrowser(): boolean {
  return typeof window !== "undefined";
}
