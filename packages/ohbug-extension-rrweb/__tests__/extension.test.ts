import { beforeEach, describe, expect, test, vi } from "vitest";

const mockStop = vi.fn();
vi.mock("@ohbug/types", () => ({}));
vi.mock("rrweb", () => ({
  record: vi.fn(() => mockStop),
  pack: vi.fn(),
}));

import { record } from "rrweb";

import extension from "../src/extension";

describe("@ohbug/extension-rrweb/extension", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test("should have correct name", () => {
    const ext = extension();
    expect(ext.name).toBe("OhbugExtensionRrweb");
  });

  test("should have onSetup, onDestroy, and onEvent hooks", () => {
    const ext = extension();
    expect(ext.onSetup).toBeDefined();
    expect(ext.onDestroy).toBeDefined();
    expect(ext.onEvent).toBeDefined();
  });

  test("onSetup should call rrweb record", () => {
    const ext = extension();
    ext.onSetup!({} as any);

    expect(record).toHaveBeenCalledTimes(1);
    expect(record).toHaveBeenCalledWith(
      expect.objectContaining({
        checkoutEveryNms: 60_000,
        sampling: expect.objectContaining({
          mousemove: false,
          scroll: 250,
          media: 800,
          input: "last",
        }),
      }),
    );
  });

  test("onDestroy should stop recording", () => {
    const ext = extension();
    ext.onSetup!({} as any);
    ext.onDestroy!({} as any);

    expect(mockStop).toHaveBeenCalledTimes(1);
  });

  test("onEvent should add rrweb metadata to event", () => {
    const ext = extension();
    ext.onSetup!({} as any);

    // Simulate events via the emit callback
    const emitFn = vi.mocked(record).mock.calls[0][0]!.emit!;
    const fakeEvent1 = { type: 1, timestamp: 1000 } as any;
    const fakeEvent2 = { type: 2, timestamp: 2000 } as any;
    emitFn(fakeEvent1, false);
    emitFn(fakeEvent2, false);

    const addMetadata = vi.fn();
    const mockEvent = { addMetadata } as any;

    const result = ext.onEvent!(mockEvent, {} as any);

    expect(addMetadata).toHaveBeenCalledWith(
      "rrweb",
      expect.arrayContaining([fakeEvent1, fakeEvent2]),
    );
    expect(result).toBe(mockEvent);
  });

  test("onEvent should combine last two event arrays on checkout", () => {
    const ext = extension();
    ext.onSetup!({} as any);

    const emitFn = vi.mocked(record).mock.calls[0][0]!.emit!;

    // First batch
    const event1 = { type: 1, timestamp: 1000 } as any;
    emitFn(event1, false);

    // Trigger checkout — starts new batch
    const event2 = { type: 2, timestamp: 2000 } as any;
    emitFn(event2, true); // isCheckout

    const event3 = { type: 3, timestamp: 3000 } as any;
    emitFn(event3, false);

    const addMetadata = vi.fn();
    const mockEvent = { addMetadata } as any;

    ext.onEvent!(mockEvent, {} as any);

    // Should combine the previous batch [event1] with current [event2, event3]
    const events = addMetadata.mock.calls[0][1];
    expect(events).toContain(event1);
    expect(events).toContain(event2);
    expect(events).toContain(event3);
  });
});
