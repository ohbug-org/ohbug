import { afterEach, beforeEach, describe, expect, test, vi } from "vitest";

import Session from "../src/session";

describe("@ohbug/extension-view/session", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  test("should initialise with current timestamp", () => {
    const now = Date.now();
    const session = new Session();
    expect(session.session).toBe(now);
  });

  test("should use default timeout of 30 minutes", () => {
    const session = new Session();
    expect(session.timeout).toBe(30 * 60 * 1000);
  });

  test("should accept custom timeout", () => {
    const session = new Session(5000);
    expect(session.timeout).toBe(5000);
  });

  test("isExpired should return false before timeout", () => {
    const session = new Session(10_000);
    vi.advanceTimersByTime(5_000);
    expect(session.isExpired()).toBe(false);
  });

  test("isExpired should return true after timeout", () => {
    const session = new Session(10_000);
    vi.advanceTimersByTime(11_000);
    expect(session.isExpired()).toBe(true);
  });

  test("isExpired should return true exactly at timeout boundary", () => {
    const session = new Session(10_000);
    vi.advanceTimersByTime(10_001);
    expect(session.isExpired()).toBe(true);
  });

  test("update should reset session timestamp", () => {
    const session = new Session(10_000);
    vi.advanceTimersByTime(5_000);
    const updated = session.update();
    expect(updated).toBe(Date.now());

    // After update, the session should not be expired
    vi.advanceTimersByTime(5_000);
    expect(session.isExpired()).toBe(false);
  });

  test("update after full timeout cycle should still work", () => {
    const session = new Session(10_000);
    vi.advanceTimersByTime(15_000);
    expect(session.isExpired()).toBe(true);

    session.update();
    expect(session.isExpired()).toBe(false);
  });
});
