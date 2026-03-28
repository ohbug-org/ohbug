import { describe, expect, test } from "vitest";

import { error } from "../src/warning";

describe("@ohbug/utils/warning", () => {
  test("does nothing when condition is true", () => {
    expect(() => error(true, "some message")).not.toThrow();
  });

  test("throws when condition is false", () => {
    expect(() => error(false, "something went wrong")).toThrow("Ohbug something went wrong");
  });

  test("throws with formatted message using %s placeholders", () => {
    expect(() => error(false, "expected %s but got %s", "a", "b")).toThrow(
      "Ohbug expected a but got b",
    );
  });

  test("throws when format is undefined", () => {
    // @ts-expect-error testing undefined format
    expect(() => error(true, undefined)).toThrow(
      "`Ohbug warning(condition, format, ...args)` requires a warning message argument",
    );
  });
});
