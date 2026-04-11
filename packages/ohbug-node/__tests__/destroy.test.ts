// @vitest-environment node
import { afterEach, beforeEach, describe, expect, test, vi } from "vitest";

vi.mock("../src/capture", () => ({
  removeCaptureConsole: vi.fn(),
  removeCaptureProcess: vi.fn(),
}));

import { removeCaptureConsole, removeCaptureProcess } from "../src/capture";
import { destroy, handleDestroy } from "../src/destroy";

describe("@ohbug/node/destroy", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    // Remove any beforeExit listeners we registered
    process.removeAllListeners("beforeExit");
    vi.restoreAllMocks();
  });

  test("handleDestroy registers beforeExit listener on process", () => {
    const spy = vi.spyOn(process, "on");
    handleDestroy();

    expect(spy).toHaveBeenCalledWith("beforeExit", expect.any(Function));
  });

  test("destroy calls removeCaptureProcess and removeCaptureConsole", () => {
    destroy();

    expect(removeCaptureProcess).toHaveBeenCalledOnce();
    expect(removeCaptureConsole).toHaveBeenCalledOnce();
  });

  test("destroy removes the beforeExit listener", () => {
    handleDestroy();
    const listenersBefore = process.listenerCount("beforeExit");

    destroy();
    const listenersAfter = process.listenerCount("beforeExit");

    expect(listenersAfter).toBeLessThan(listenersBefore);
  });

  test("beforeExit event triggers destroy logic", () => {
    handleDestroy();

    process.emit("beforeExit", 0);

    expect(removeCaptureProcess).toHaveBeenCalledOnce();
    expect(removeCaptureConsole).toHaveBeenCalledOnce();
  });
});
