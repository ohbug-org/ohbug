import { Client } from "@ohbug/core";
import type { OhbugConfig, OhbugEventWithMethods, OhbugGetDevice } from "@ohbug/types";
import React from "react";
import { describe, expect, test, vi } from "vitest";

import { OhbugErrorBoundary } from "../src/OhbugErrorBoundary";

function createMockClient() {
  const getDevice: OhbugGetDevice = () => ({});
  return new Client({
    sdk: { platform: "test", version: "0.0.0" },
    config: { apiKey: "TEST_KEY" } as OhbugConfig,
    device: getDevice,
    notifier: (event: OhbugEventWithMethods<any>) => event,
  });
}

describe("@ohbug/react/OhbugErrorBoundary", () => {
  test("is a React component class", () => {
    expect(OhbugErrorBoundary.prototype).toBeInstanceOf(React.Component);
  });

  test("constructor initializes state with error: null", () => {
    const client = createMockClient();
    const boundary = new OhbugErrorBoundary({ client });
    expect(boundary.state.error).toBeNull();
  });

  test("render returns children when no error", () => {
    const client = createMockClient();
    const children = React.createElement("div", null, "Hello");
    const boundary = new OhbugErrorBoundary({ client, children });
    boundary.state = { error: null };

    const result = boundary.render();
    expect(result).toBe(children);
  });

  test("render returns FallbackComponent when error exists", () => {
    const client = createMockClient();
    const fallback = React.createElement("div", null, "Error occurred");
    const boundary = new OhbugErrorBoundary({ client, FallbackComponent: fallback });
    boundary.state = { error: new Error("test") };

    const result = boundary.render();
    expect(result).toBe(fallback);
  });

  test("render returns null when error exists but no FallbackComponent", () => {
    const client = createMockClient();
    const boundary = new OhbugErrorBoundary({ client });
    boundary.state = { error: new Error("test") };

    const result = boundary.render();
    expect(result).toBeNull();
  });

  test("componentDidCatch creates event and notifies client", () => {
    const client = createMockClient();
    const createEventSpy = vi.spyOn(client, "createEvent");
    const notifySpy = vi.spyOn(client, "notify");

    const boundary = new OhbugErrorBoundary({ client });
    // Simulate React's internal updater to allow setState
    const setStateSpy = vi.spyOn(boundary, "setState").mockImplementation((state: any) => {
      Object.assign(boundary.state, typeof state === "function" ? state(boundary.state) : state);
    });

    const error = new Error("React error");
    const info = { componentStack: "at Component" };

    boundary.componentDidCatch(error, info);

    expect(createEventSpy).toHaveBeenCalledTimes(1);
    const eventArg = createEventSpy.mock.calls[0][0];
    expect(eventArg.type).toBe("react");
    expect(eventArg.category).toBe("error");
    const detail = eventArg.detail as any;
    expect(detail.name).toBe("Error");
    expect(detail.message).toBe("React error");
    expect(detail.stack).toBe(error.stack);
    expect(detail.errorInfo).toBe(info);
    expect(notifySpy).toHaveBeenCalledTimes(1);

    // Verify setState was called with the error
    expect(setStateSpy).toHaveBeenCalledWith({ error });
  });
});
