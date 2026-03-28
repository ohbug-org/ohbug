import { describe, expect, test } from "vitest";

import { schema } from "../../src/config";
import { verifyConfig } from "../../src/lib/verifyConfig";

describe("@ohbug/core/lib/verifyConfig", () => {
  test("uses provided values when valid", () => {
    const config = {
      apiKey: "test-key",
      appVersion: "1.0.0",
      maxActions: 50,
    };
    const { config: result, errors } = verifyConfig(config as any, schema);

    expect(result.apiKey).toBe("test-key");
    expect(result.appVersion).toBe("1.0.0");
    expect(result.maxActions).toBe(50);
    expect(Object.keys(errors).length).toBe(0);
  });

  test("falls back to defaults for invalid values", () => {
    const config = {
      apiKey: 123, // should be string
      maxActions: 999, // out of range 0-100
    };
    const { config: result, errors } = verifyConfig(config as any, schema);

    expect(result.apiKey).toBeUndefined(); // defaultValue
    expect(result.maxActions).toBe(30); // defaultValue
    expect(errors.apiKey).toBeDefined();
    expect(errors.maxActions).toBeDefined();
  });

  test("uses defaults when values are undefined", () => {
    const config = { apiKey: "key" };
    const { config: result } = verifyConfig(config as any, schema);

    expect(result.releaseStage).toBe("production");
    expect(result.endpoint).toBe("http://localhost:6660");
    expect(result.maxActions).toBe(30);
  });
});
