import { defineExtension } from "@ohbug/core";

import { handleCapture } from "./capture";
import { handleDestroy } from "./destroy";

export const extension = defineExtension({
  name: "OhbugNode",
  onSetup: () => {
    handleCapture();
    handleDestroy();
  },
});
