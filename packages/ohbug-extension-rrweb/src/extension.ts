import type { OhbugExtension } from "@ohbug/types";
import { type eventWithTime } from "@rrweb/types";
import { pack, record } from "rrweb";

const eventsMatrix: eventWithTime[][] = [[]];
let stopRecording: ReturnType<typeof record>;

const extension = (): OhbugExtension => ({
  name: "OhbugExtensionRrweb",
  onSetup: () => {
    stopRecording = record({
      emit(event, isCheckout) {
        if (isCheckout) {
          eventsMatrix.push([]);
        }
        const lastEvents = eventsMatrix.at(-1);
        lastEvents?.push(event);
      },
      checkoutEveryNms: 1 * 60 * 1000,
      sampling: {
        mousemove: false,
        scroll: 250,
        media: 800,
        input: "last",
      },
      packFn: pack,
    });
  },
  onDestroy: () => {
    stopRecording?.();
    stopRecording = undefined;
    // Clear recorded events
    // 清除已记录的事件
    eventsMatrix.length = 0;
    eventsMatrix.push([]);
  },
  onEvent: (event) => {
    const len = eventsMatrix.length;
    const events = (eventsMatrix[len - 2] || []).concat(eventsMatrix[len - 1]);
    event.addMetadata("rrweb", events);
    return event;
  },
});

export default extension;
