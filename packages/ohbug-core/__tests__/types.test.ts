import { describe, expect, test } from "vitest";

import { EventTypes } from "../src/types";

describe("@ohbug/core/types", () => {
  test("EventTypes contains expected error types", () => {
    expect(EventTypes.UNCAUGHT_ERROR).toBe("uncaughtError");
    expect(EventTypes.RESOURCE_ERROR).toBe("resourceError");
    expect(EventTypes.UNHANDLEDREJECTION_ERROR).toBe("unhandledrejectionError");
    expect(EventTypes.AJAX_ERROR).toBe("ajaxError");
    expect(EventTypes.FETCH_ERROR).toBe("fetchError");
    expect(EventTypes.WEBSOCKET_ERROR).toBe("websocketError");
    expect(EventTypes.UNKNOWN_ERROR).toBe("unknownError");
  });

  test("EventTypes contains message, feedback, view types", () => {
    expect(EventTypes.MESSAGE).toBe("message");
    expect(EventTypes.FEEDBACK).toBe("feedback");
    expect(EventTypes.VIEW).toBe("view");
  });

  test("EventTypes contains framework types", () => {
    expect(EventTypes.REACT).toBe("react");
    expect(EventTypes.VUE).toBe("vue");
    expect(EventTypes.ANGULAR).toBe("angular");
  });

  test("EventTypes contains miniapp types", () => {
    expect(EventTypes.MINIAPP_ERROR).toBe("miniappError");
    expect(EventTypes.MINIAPP_UNHANDLEDREJECTION_ERROR).toBe("miniappUnhandledrejectionError");
    expect(EventTypes.MINIAPP_PAGENOTFOUND_ERROR).toBe("miniappPagenotfoundError");
    expect(EventTypes.MINIAPP_MEMORYWARNING_ERROR).toBe("miniappMemorywarningError");
  });
});
