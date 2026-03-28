import { getGlobal, replace } from "@ohbug/utils";

const global = getGlobal<Window>();
const access = "addEventListener" in global;
const EventTargetProto = EventTarget?.prototype;
const EventTargetOriginal = access
  ? { addEventListener: EventTarget.prototype.addEventListener.bind(EventTarget.prototype) }
  : {};

export function replaceAddEventListener() {
  EventTargetProto.addEventListener = replace(
    EventTargetProto,
    "addEventListener",
    (origin) =>
      function call(this: any, type: string, listener: any, options: any) {
        const wrappedListener = (...args: any[]) => {
          return listener.apply(this, args);
        };
        return origin.call(this, type, wrappedListener, options);
      },
  );
}

export function removeReplaceAddEventListener() {
  if (access && EventTargetOriginal.addEventListener) {
    const EventTargetProto = EventTarget?.prototype;
    EventTargetProto.addEventListener = EventTargetOriginal.addEventListener;
  }
}
