import { describe, expect, test } from "vitest";

import { replaceAddEventListener } from "../src/replaceAddEventListener";

describe("@ohbug/browser/replaceAddEventListener", () => {
  test("replaceAddEventListener is a function", () => {
    expect(typeof replaceAddEventListener).toBe("function");
  });

  test("replaced addEventListener still works with events", () => {
    replaceAddEventListener();

    let called = false;
    const div = document.createElement("div");
    div.addEventListener("click", () => {
      called = true;
    });
    div.dispatchEvent(new Event("click"));
    expect(called).toBe(true);
  });
});
