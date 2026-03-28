import { afterEach, beforeEach, describe, expect, test, vi } from "vitest";

import { sendPageView, sendUserView } from "../src/create-event";

describe("@ohbug/extension-view/create-event", () => {
  let mockNotify: ReturnType<typeof vi.fn>;
  let mockCreateEvent: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    mockNotify = vi.fn().mockResolvedValue(undefined);
    mockCreateEvent = vi.fn().mockReturnValue({ type: "mock" });
    (globalThis as any).__OHBUG__ = {
      client: { createEvent: mockCreateEvent, notify: mockNotify },
    };
  });

  afterEach(() => {
    delete (globalThis as any).__OHBUG__;
  });

  describe("sendPageView", () => {
    test("should create and notify a pageView event", () => {
      sendPageView("/home");

      expect(mockCreateEvent).toHaveBeenCalledWith({
        category: "view",
        type: "pageView",
        detail: { initial: undefined, path: "/home" },
      });
      expect(mockNotify).toHaveBeenCalledWith({ type: "mock" });
    });

    test("should pass initial flag when provided", () => {
      sendPageView("/home", true);

      expect(mockCreateEvent).toHaveBeenCalledWith({
        category: "view",
        type: "pageView",
        detail: { initial: true, path: "/home" },
      });
    });

    test("should pass initial=false when explicitly set", () => {
      sendPageView("/home", false);

      expect(mockCreateEvent).toHaveBeenCalledWith({
        category: "view",
        type: "pageView",
        detail: { initial: false, path: "/home" },
      });
    });
  });

  describe("sendUserView", () => {
    test("should create and notify a userView event", () => {
      sendUserView("/about");

      expect(mockCreateEvent).toHaveBeenCalledWith({
        category: "view",
        type: "userView",
        detail: { path: "/about" },
      });
      expect(mockNotify).toHaveBeenCalledWith({ type: "mock" });
    });
  });
});
