import { afterEach, beforeEach, describe, expect, test } from "vitest";

import { resourceErrorHandler } from "../../src/handle/resourceErrorHandler";
import { cleanupTestClient, setupTestClient } from "../utils";

describe("@ohbug/browser/handle/resourceErrorHandler", () => {
  beforeEach(() => {
    setupTestClient();
  });

  afterEach(() => {
    cleanupTestClient();
  });

  test("creates resource error event from ErrorEvent with target", () => {
    const img = document.createElement("img");
    img.src = "https://example.com/image.png";
    img.id = "test-img";
    img.className = "photo";

    const errorEvent = new ErrorEvent("error");
    Object.defineProperty(errorEvent, "target", { value: img });

    expect(() => resourceErrorHandler(errorEvent)).not.toThrow();
  });
});
