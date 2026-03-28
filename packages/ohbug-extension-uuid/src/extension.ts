import type { OhbugExtension } from "@ohbug/types";

import { getUUID } from "./uuid";

export const extension = (): OhbugExtension => ({
  name: "OhbugExtensionUUID",
  onEvent: (event) => {
    const uuid = getUUID();
    event.setUser({ uuid });
    return event;
  },
});
