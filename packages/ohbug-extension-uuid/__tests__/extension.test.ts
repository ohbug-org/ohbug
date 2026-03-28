import { beforeEach, describe, expect, test, vi } from "vitest";

vi.mock("@ohbug/types", () => ({}));

import { docCookies } from "../src/cookie";
import { extension } from "../src/extension";

describe("@ohbug/extension-uuid/extension", () => {
  beforeEach(() => {
    docCookies.removeItem("OhbugUUID");
  });

  test("should have correct name", () => {
    const ext = extension();
    expect(ext.name).toBe("OhbugExtensionUUID");
  });

  test("onEvent should set user uuid on event", () => {
    const ext = extension();
    const setUser = vi.fn();
    const mockEvent = { setUser } as any;

    const result = ext.onEvent!(mockEvent, {} as any);

    expect(setUser).toHaveBeenCalledTimes(1);
    expect(setUser).toHaveBeenCalledWith(expect.objectContaining({ uuid: expect.any(String) }));
    expect(result).toBe(mockEvent);
  });

  test("onEvent should set the same uuid across multiple calls", () => {
    const ext = extension();
    const uuids: string[] = [];
    const setUser = vi.fn((u: { uuid: string }) => uuids.push(u.uuid));
    const mockEvent = { setUser } as any;

    ext.onEvent!(mockEvent, {} as any);
    ext.onEvent!(mockEvent, {} as any);

    expect(uuids[0]).toBe(uuids[1]);
  });
});
