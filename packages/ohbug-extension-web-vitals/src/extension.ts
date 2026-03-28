import type { OhbugClient, OhbugExtension } from "@ohbug/types";
import { onCLS, onFCP, onINP, onLCP, onTTFB } from "web-vitals";
import { type Metric } from "web-vitals";

function createNotifier(client: OhbugClient) {
  let isSent = false;
  let isCalled = false;
  let result = {};

  const sendValues = () => {
    if (isSent) return; // data is already sent
    if (!isCalled) return; // no data collected

    const event = client.createEvent({
      category: "performance",
      type: "web-vitals",
      detail: result,
    });
    void client.notify(event);
    isSent = true;
  };

  const notify = (metric: Metric) => {
    if (!isCalled) isCalled = true;
    result = { ...result, [metric.name]: metric.value };
  };

  setTimeout(() => {
    const supportedEntryTypes =
      (PerformanceObserver && PerformanceObserver.supportedEntryTypes) || [];
    const isLatestVisibilityChangeSupported = supportedEntryTypes.includes("layout-shift");

    if (isLatestVisibilityChangeSupported) {
      const onVisibilityChange = () => {
        if (document.visibilityState === "hidden") {
          sendValues();
          removeEventListener("visibilitychange", onVisibilityChange, true);
        }
      };
      addEventListener("visibilitychange", onVisibilityChange, true);
    } else {
      addEventListener("pagehide", sendValues, { capture: true, once: true });
    }
  });

  return notify;
}

const extension = (): OhbugExtension => ({
  name: "OhbugExtensionWebVitals",
  onSetup: (client) => {
    const notify = createNotifier(client);
    onCLS(notify);
    onFCP(notify);
    onINP(notify);
    onLCP(notify);
    onTTFB(notify);
  },
});

export default extension;
