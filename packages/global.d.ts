import type { OhbugObject } from "./ohbug-types/src";

declare global {
  interface Window {
    __OHBUG__: OhbugObject;
  }
}
