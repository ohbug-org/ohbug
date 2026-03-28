import { describe, expect, test } from "vitest";

import { getConfigErrorMessage, getErrorMessage } from "../../src/lib/getErrorMessage";

describe("@ohbug/core/lib/getErrorMessage", () => {
  describe("getConfigErrorMessage", () => {
    test("formats error messages with config keys", () => {
      const errors = {
        apiKey: "is required",
        maxActions: "should be a number between 0 and 100",
      } as any;
      const config = { apiKey: "", maxActions: 999 } as any;

      const result = getConfigErrorMessage(errors, config);
      expect(result).toBeInstanceOf(Error);
      expect(result.message).toContain("Invalid configuration");
      expect(result.message).toContain("apiKey is required");
      expect(result.message).toContain('got ""');
      expect(result.message).toContain("maxActions should be a number between 0 and 100");
      expect(result.message).toContain("got 999");
    });
  });

  describe("getErrorMessage", () => {
    test("formats error message with data", () => {
      const result = getErrorMessage("invalid user", { id: 1 });
      expect(result).toBeInstanceOf(Error);
      expect(result.message).toContain("Invalid data");
      expect(result.message).toContain("invalid user");
      expect(result.message).toContain('{"id":1}');
    });
  });
});
