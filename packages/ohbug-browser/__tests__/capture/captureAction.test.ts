import { afterEach, beforeEach, describe, expect, test, vi } from "vitest";

import { captureClick, removeCaptureClick } from "../../src/capture/action/captureClick";
import {
  captureUrlChange,
  removeCaptureUrlChange,
} from "../../src/capture/action/captureUrlChange";
import { cleanupTestClient, setupTestClient } from "../utils";

describe("@ohbug/browser/capture/action", () => {
  beforeEach(() => {
    setupTestClient();
  });

  afterEach(() => {
    removeCaptureClick();
    removeCaptureUrlChange();
    cleanupTestClient();
  });

  describe("captureClick", () => {
    test("registers click listener on document", () => {
      const addSpy = vi.spyOn(document, "addEventListener");
      captureClick();
      expect(addSpy).toHaveBeenCalledWith("click", expect.any(Function));
      addSpy.mockRestore();
    });

    test("records click action for non-HTML/BODY elements", () => {
      captureClick();
      const client = (window as any).__OHBUG__.client;
      const initialLength = client.__actions.length;

      const div = document.createElement("div");
      div.id = "test-btn";
      document.body.appendChild(div);

      const event = new MouseEvent("click", { bubbles: true });
      div.dispatchEvent(event);

      expect(client.__actions.length).toBeGreaterThan(initialLength);
      const lastAction = client.__actions[client.__actions.length - 1];
      expect(lastAction.type).toBe("click");

      document.body.removeChild(div);
    });

    test("removeCaptureClick removes listener", () => {
      const removeSpy = vi.spyOn(document, "removeEventListener");
      removeCaptureClick();
      expect(removeSpy).toHaveBeenCalledWith("click", expect.any(Function));
      removeSpy.mockRestore();
    });
  });

  describe("captureUrlChange", () => {
    test("captureUrlChange does not throw", () => {
      expect(() => captureUrlChange()).not.toThrow();
    });

    test("removeCaptureUrlChange does not throw", () => {
      captureUrlChange();
      expect(() => removeCaptureUrlChange()).not.toThrow();
    });

    test("records navigation action on history.pushState", () => {
      captureUrlChange();
      const client = (window as any).__OHBUG__.client;
      const initialLength = client.__actions.length;

      window.history.pushState({}, "", "/new-path");

      expect(client.__actions.length).toBeGreaterThan(initialLength);
      const lastAction = client.__actions[client.__actions.length - 1];
      expect(lastAction.type).toBe("navigation");
    });

    test("records navigation action on history.replaceState", () => {
      captureUrlChange();
      const client = (window as any).__OHBUG__.client;
      const initialLength = client.__actions.length;

      window.history.replaceState({}, "", "/replaced-path");

      expect(client.__actions.length).toBeGreaterThan(initialLength);
      const lastAction = client.__actions[client.__actions.length - 1];
      expect(lastAction.type).toBe("navigation");
    });

    test("does not record navigation when from === to", () => {
      captureUrlChange();
      const client = (window as any).__OHBUG__.client;

      // Push to a specific path, then push the same path again
      window.history.pushState({}, "", "/same-path");
      const lengthAfterFirst = client.__actions.length;

      window.history.pushState({}, "", "/same-path");
      // Should not add a new action since from === to
      expect(client.__actions.length).toBe(lengthAfterFirst);
    });

    test("removeCaptureUrlChange restores history methods", () => {
      captureUrlChange();
      removeCaptureUrlChange();

      // After restoration, history methods should still work
      expect(() => window.history.pushState({}, "", "/after-restore")).not.toThrow();
    });

    test("records navigation on hashchange", () => {
      captureUrlChange();
      const client = (window as any).__OHBUG__.client;
      const initialLength = client.__actions.length;

      // Dispatch hashchange event
      const event = new HashChangeEvent("hashchange", {
        oldURL: "http://localhost/#old",
        newURL: "http://localhost/#new",
      });
      window.dispatchEvent(event);

      expect(client.__actions.length).toBeGreaterThan(initialLength);
    });

    test("handles onpopstate replacement", () => {
      // Set an initial onpopstate
      const originalOnpopstate = vi.fn();
      window.onpopstate = originalOnpopstate;

      captureUrlChange();

      // Trigger onpopstate
      if (window.onpopstate) {
        const popstateEvent = new PopStateEvent("popstate");
        window.onpopstate.call(window, popstateEvent);
      }

      removeCaptureUrlChange();
    });
  });
});
