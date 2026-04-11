// @vitest-environment node
import { afterEach, beforeEach, describe, expect, test, vi } from "vitest";

vi.mock("../../src/capture/captureConsole", () => ({
  captureConsole: vi.fn(),
  removeCaptureConsole: vi.fn(),
}));
vi.mock("../../src/capture/captureUncaughtException", () => ({
  captureUncaughtException: vi.fn(),
  removeCaptureUncaughtException: vi.fn(),
}));
vi.mock("../../src/capture/captureUnhandledRejection", () => ({
  captureUnhandledRejection: vi.fn(),
  removeCaptureUnhandledRejection: vi.fn(),
}));

import { captureProcess, handleCapture, removeCaptureProcess } from "../../src/capture";
import { captureConsole } from "../../src/capture/captureConsole";
import {
  captureUncaughtException,
  removeCaptureUncaughtException,
} from "../../src/capture/captureUncaughtException";
import {
  captureUnhandledRejection,
  removeCaptureUnhandledRejection,
} from "../../src/capture/captureUnhandledRejection";

describe("@ohbug/node/capture/index", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  test("captureProcess registers both uncaughtException and unhandledRejection", () => {
    captureProcess();

    expect(captureUncaughtException).toHaveBeenCalledOnce();
    expect(captureUnhandledRejection).toHaveBeenCalledOnce();
  });

  test("removeCaptureProcess removes both listeners", () => {
    removeCaptureProcess();

    expect(removeCaptureUncaughtException).toHaveBeenCalledOnce();
    expect(removeCaptureUnhandledRejection).toHaveBeenCalledOnce();
  });

  test("handleCapture calls captureProcess and captureConsole", () => {
    handleCapture();

    expect(captureUncaughtException).toHaveBeenCalledOnce();
    expect(captureUnhandledRejection).toHaveBeenCalledOnce();
    expect(captureConsole).toHaveBeenCalledOnce();
  });
});
