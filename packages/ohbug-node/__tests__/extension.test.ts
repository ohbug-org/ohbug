// @vitest-environment node
import { afterEach, beforeEach, describe, expect, test, vi } from "vitest";

vi.mock("../src/capture", () => ({
  handleCapture: vi.fn(),
}));
vi.mock("../src/destroy", () => ({
  handleDestroy: vi.fn(),
}));

import { handleCapture } from "../src/capture";
import { handleDestroy } from "../src/destroy";
import { extension } from "../src/extension";

describe("@ohbug/node/extension", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  test("extension has correct name", () => {
    expect(extension.name).toBe("OhbugNode");
  });

  test("onSetup calls handleCapture and handleDestroy", () => {
    extension.onSetup!({} as any);

    expect(handleCapture).toHaveBeenCalledOnce();
    expect(handleDestroy).toHaveBeenCalledOnce();
  });
});
