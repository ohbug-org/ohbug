import { getGlobal } from "@ohbug/utils";

import {
  removeCaptureAction,
  removeCaptureConsole,
  removeCaptureNetwork,
  removeCaptureScript,
} from "./capture";
import { removeReplaceAddEventListener } from "./replaceAddEventListener";

const global = getGlobal<Window>();

export function destroy() {
  removeReplaceAddEventListener();
  removeCaptureScript();
  removeCaptureNetwork();
  removeCaptureAction();
  removeCaptureConsole();
}

export function handleDestroy() {
  global?.addEventListener?.(
    "unload",
    () => {
      destroy();
    },
    true,
  );
}
