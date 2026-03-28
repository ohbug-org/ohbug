import { describe, expect, test } from "vitest";

import { isFunction, isNumber, isObject, isPromise, isString } from "../src/validators";

describe("@ohbug/utils/validators", () => {
  describe("isString", () => {
    test("returns true for strings", () => {
      expect(isString("")).toBe(true);
      expect(isString("hello")).toBe(true);
    });

    test("returns false for non-strings", () => {
      expect(isString(0)).toBe(false);
      expect(isString(null)).toBe(false);
      expect(isString(undefined)).toBe(false);
      expect(isString({})).toBe(false);
      expect(isString([])).toBe(false);
      expect(isString(true)).toBe(false);
    });
  });

  describe("isNumber", () => {
    test("returns true for integers", () => {
      expect(isNumber(0)).toBe(true);
      expect(isNumber(1)).toBe(true);
      expect(isNumber(-1)).toBe(true);
      expect(isNumber(100)).toBe(true);
    });

    test("returns false for non-integers and non-numbers", () => {
      expect(isNumber(1.5)).toBe(false);
      expect(isNumber(NaN)).toBe(false);
      expect(isNumber(Infinity)).toBe(false);
      expect(isNumber("1")).toBe(false);
      expect(isNumber(null)).toBe(false);
      expect(isNumber(undefined)).toBe(false);
    });
  });

  describe("isFunction", () => {
    test("returns true for functions", () => {
      expect(isFunction(() => {})).toBe(true);
      expect(isFunction(function () {})).toBe(true);
      expect(isFunction(Date)).toBe(true);
    });

    test("returns false for non-functions", () => {
      expect(isFunction("fn")).toBe(false);
      expect(isFunction(null)).toBe(false);
      expect(isFunction({})).toBe(false);
    });
  });

  describe("isObject", () => {
    test("returns true for plain objects", () => {
      expect(isObject({})).toBe(true);
      expect(isObject({ a: 1 })).toBe(true);
    });

    test("returns false for non-plain-objects", () => {
      expect(isObject([])).toBe(false);
      expect(isObject(null)).toBe(false);
      expect(isObject("str")).toBe(false);
      expect(isObject(new Date())).toBe(false);
      expect(isObject(undefined)).toBe(false);
    });
  });

  describe("isPromise", () => {
    test("returns true for promises", () => {
      expect(isPromise(Promise.resolve())).toBe(true);
      expect(isPromise(new Promise(() => {}))).toBe(true);
    });

    test("returns false for non-promises", () => {
      expect(isPromise({})).toBe(false);
      const thenable = { next: () => {} };
      expect(isPromise(thenable)).toBe(false);
      expect(isPromise(null)).toBe(false);
      expect(isPromise(undefined)).toBe(false);
    });
  });
});
