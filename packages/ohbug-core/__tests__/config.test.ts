import type { OhbugConfig } from "@ohbug/types";
import { describe, expect, test } from "vitest";

import { schema } from "../src/config";

describe("@ohbug/core/config", () => {
  describe("schema", () => {
    test("has the required properties { validate, defaultValue, message }", () => {
      Object.keys(schema).forEach((key) => {
        const value = schema[key as keyof OhbugConfig];
        expect(value).toHaveProperty("defaultValue");
        expect(value).toHaveProperty("message");
        expect(value).toHaveProperty("validate");
        expect(typeof value.message).toBe("string");
        expect(typeof value.validate).toBe("function");
      });
    });
  });

  describe("validate functions", () => {
    test("apiKey: validates string values", () => {
      expect(schema.apiKey.validate("key")).toBe(true);
      expect(schema.apiKey.validate("")).toBe(false);
      expect(schema.apiKey.validate(123)).toBe(false);
      expect(schema.apiKey.validate(undefined)).toBe(false);
    });

    test("appVersion: validates string or undefined", () => {
      expect(schema.appVersion.validate("1.0.0")).toBe(true);
      expect(schema.appVersion.validate(undefined)).toBe(true);
      expect(schema.appVersion.validate(123)).toBe(false);
    });

    test("appType: validates string or undefined", () => {
      expect(schema.appType.validate("web")).toBe(true);
      expect(schema.appType.validate(undefined)).toBe(true);
      expect(schema.appType.validate(123)).toBe(false);
    });

    test("releaseStage: validates string or undefined", () => {
      expect(schema.releaseStage.validate("production")).toBe(true);
      expect(schema.releaseStage.validate(undefined)).toBe(true);
      expect(schema.releaseStage.validate(123)).toBe(false);
    });

    test("endpoint: validates string or undefined", () => {
      expect(schema.endpoint.validate("http://localhost")).toBe(true);
      expect(schema.endpoint.validate(undefined)).toBe(true);
      expect(schema.endpoint.validate(123)).toBe(false);
    });

    test("maxActions: validates number 0-100 or undefined", () => {
      expect(schema.maxActions.validate(0)).toBe(true);
      expect(schema.maxActions.validate(50)).toBe(true);
      expect(schema.maxActions.validate(100)).toBe(true);
      expect(schema.maxActions.validate(undefined)).toBe(true);
      expect(schema.maxActions.validate(-1)).toBe(false);
      expect(schema.maxActions.validate(101)).toBe(false);
      expect(schema.maxActions.validate("50")).toBe(false);
    });

    test("onEvent: validates function or undefined", () => {
      expect(schema.onEvent.validate(() => {})).toBe(true);
      expect(schema.onEvent.validate(undefined)).toBe(true);
      expect(schema.onEvent.validate("fn")).toBe(false);
    });

    test("onNotify: validates function or undefined", () => {
      expect(schema.onNotify.validate(() => {})).toBe(true);
      expect(schema.onNotify.validate(undefined)).toBe(true);
      expect(schema.onNotify.validate("fn")).toBe(false);
    });

    test("logger: validates logger object or undefined", () => {
      const validLogger = {
        log: () => {},
        info: () => {},
        warn: () => {},
        error: () => {},
      };
      expect(schema.logger.validate(validLogger)).toBe(true);
      expect(schema.logger.validate(undefined)).toBe(true);
      expect(schema.logger.validate({ log: () => {} })).toBe(false); // missing methods
      expect(schema.logger.validate("logger")).toBe(false);
    });

    test("user: validates object with <=6 keys or undefined", () => {
      expect(schema.user.validate({ id: 1 })).toBe(true);
      expect(schema.user.validate(undefined)).toBe(true);
      expect(schema.user.validate({ a: 1, b: 2, c: 3, d: 4, e: 5, f: 6 })).toBe(true);
      expect(schema.user.validate({ a: 1, b: 2, c: 3, d: 4, e: 5, f: 6, g: 7 })).toBe(false);
      expect(schema.user.validate("user")).toBe(false);
    });

    test("metadata: validates object or undefined", () => {
      expect(schema.metadata.validate({ key: "value" })).toBe(true);
      expect(schema.metadata.validate(undefined)).toBe(true);
      expect(schema.metadata.validate("meta")).toBe(false);
    });
  });
});
