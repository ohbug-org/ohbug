import { describe, expect, test } from "vitest";

import { getSelector } from "../src/dom";

describe("@ohbug/utils/dom", () => {
  test("returns selector for a simple element", () => {
    const div = document.createElement("div");
    div.id = "app";
    document.body.appendChild(div);

    const span = document.createElement("span");
    span.className = "label";
    div.appendChild(span);

    const event = new MouseEvent("click", { bubbles: true });
    Object.defineProperty(event, "target", { value: span });

    const selector = getSelector(event);
    expect(typeof selector).toBe("string");
    expect(selector.length).toBeGreaterThan(0);
    // The selector should contain the span info
    expect(selector).toContain("span");
    expect(selector).toContain(".label");

    document.body.removeChild(div);
  });

  test("uses srcElement as fallback for immutableTarget", () => {
    const div = document.createElement("div");
    div.id = "fallback";
    document.body.appendChild(div);

    // When target is present but srcElement also exists, target is used
    const event = new MouseEvent("click", { bubbles: true });
    Object.defineProperty(event, "target", { value: div });
    Object.defineProperty(event, "srcElement", { value: div });

    const selector = getSelector(event);
    expect(typeof selector).toBe("string");
    expect(selector).toContain("#fallback");

    document.body.removeChild(div);
  });

  test("uses event.path when available", () => {
    const div = document.createElement("div");
    div.id = "root";
    document.body.appendChild(div);

    const p = document.createElement("p");
    div.appendChild(p);

    const event = new MouseEvent("click", { bubbles: true });
    Object.defineProperty(event, "target", { value: p });
    // Simulate event.path (Chromium feature)
    Object.defineProperty(event, "path", {
      value: [p, div, document.body, document.documentElement, document],
    });

    const selector = getSelector(event);
    expect(typeof selector).toBe("string");
    expect(selector).toContain("p");

    document.body.removeChild(div);
  });

  test("handles element with id", () => {
    const div = document.createElement("div");
    div.id = "container";
    document.body.appendChild(div);

    const event = new MouseEvent("click", { bubbles: true });
    Object.defineProperty(event, "target", { value: div });

    const selector = getSelector(event);
    expect(selector).toContain("#container");

    document.body.removeChild(div);
  });

  test("includes nth-child for matching outerHTML", () => {
    const parent = document.createElement("div");
    document.body.appendChild(parent);

    const child = document.createElement("span");
    parent.appendChild(child);

    const event = new MouseEvent("click", { bubbles: true });
    Object.defineProperty(event, "target", { value: child });

    const selector = getSelector(event);
    expect(selector).toContain(":nth-child(");

    document.body.removeChild(parent);
  });
});
