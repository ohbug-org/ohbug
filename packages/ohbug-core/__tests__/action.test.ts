import { describe, expect, test } from "vitest";

import { Action } from "../src/action";

describe("@ohbug/core/action", () => {
  test("creates action with all fields", () => {
    const ts = "2024-01-01T00:00:00.000Z";
    const action = new Action("click", { x: 1 }, "user", ts);

    expect(action.message).toBe("click");
    expect(action.data).toEqual({ x: 1 });
    expect(action.type).toBe("user");
    expect(action.timestamp).toBe(ts);
  });

  test("generates timestamp when not provided", () => {
    const before = new Date().toISOString();
    const action = new Action("msg", {}, "type");
    const after = new Date().toISOString();

    expect(action.timestamp >= before).toBe(true);
    expect(action.timestamp <= after).toBe(true);
  });
});
