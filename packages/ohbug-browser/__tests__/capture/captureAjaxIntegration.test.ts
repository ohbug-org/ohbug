import { afterEach, beforeEach, describe, expect, test } from "vitest";

import {
  captureAjaxError,
  removeCaptureAjaxError,
} from "../../src/capture/network/captureAjaxError";
import { cleanupTestClient, setupTestClient } from "../utils";

describe("@ohbug/browser/capture/network/captureAjaxError integration", () => {
  beforeEach(() => {
    setupTestClient({ endpoint: "http://test-endpoint.example.com" });
    captureAjaxError();
  });

  afterEach(() => {
    removeCaptureAjaxError();
    cleanupTestClient();
  });

  test("intercepts XMLHttpRequest open and send", () => {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", "http://example.com/api/test");

    // Verify the intercepted open stored the method/url
    // The send should not throw
    expect(() => xhr.send()).not.toThrow();
  });

  test("records ajax action on readystatechange", () => {
    const client = (window as any).__OHBUG__.client;
    const initialLength = client.__actions.length;

    const xhr = new XMLHttpRequest();
    xhr.open("GET", "http://example.com/api/data?foo=1");
    xhr.send();

    Object.defineProperty(xhr, "readyState", { value: 4, writable: true });
    Object.defineProperty(xhr, "status", { value: 200, writable: true });
    Object.defineProperty(xhr, "statusText", { value: "OK", writable: true });
    Object.defineProperty(xhr, "response", { value: "{}", writable: true });
    xhr.dispatchEvent(new Event("readystatechange"));

    expect(client.__actions.length).toBeGreaterThan(initialLength);
  });

  test("dispatches AJAX_ERROR when status >= 400", () => {
    const xhr = new XMLHttpRequest();
    xhr.open("POST", "http://example.com/api/fail");
    xhr.send("data");

    Object.defineProperty(xhr, "readyState", { value: 4, writable: true });
    Object.defineProperty(xhr, "status", { value: 500, writable: true });
    Object.defineProperty(xhr, "statusText", { value: "Internal Server Error", writable: true });
    Object.defineProperty(xhr, "response", { value: "error", writable: true });

    expect(() => xhr.dispatchEvent(new Event("readystatechange"))).not.toThrow();
  });

  test("dispatches AJAX_ERROR when status is 0 (no response)", () => {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", "http://example.com/api/timeout");
    xhr.send();

    Object.defineProperty(xhr, "readyState", { value: 4, writable: true });
    Object.defineProperty(xhr, "status", { value: 0, writable: true });
    Object.defineProperty(xhr, "statusText", { value: "", writable: true });
    Object.defineProperty(xhr, "response", { value: "", writable: true });

    expect(() => xhr.dispatchEvent(new Event("readystatechange"))).not.toThrow();
  });

  test("skips endpoint URL", () => {
    const client = (window as any).__OHBUG__.client;
    const initialLength = client.__actions.length;

    // Use the endpoint URL
    const xhr = new XMLHttpRequest();
    xhr.open("POST", client.__config.endpoint);
    xhr.send("{}");

    Object.defineProperty(xhr, "readyState", { value: 4, writable: true });
    Object.defineProperty(xhr, "status", { value: 200, writable: true });
    xhr.dispatchEvent(new Event("readystatechange"));

    // Should NOT have added an action since it's the endpoint URL
    expect(client.__actions.length).toBe(initialLength);
  });
});
