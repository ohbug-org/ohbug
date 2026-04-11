import Ohbug from "@ohbug/browser";
import OhbugExtensionFeedback from "@ohbug/extension-feedback";
import OhbugExtensionRrweb from "@ohbug/extension-rrweb";
import OhbugExtensionUUID from "@ohbug/extension-uuid";
import OhbugExtensionView from "@ohbug/extension-view";
import OhbugExtensionWebVitals from "@ohbug/extension-web-vitals";
import { OhbugErrorBoundary } from "@ohbug/react";

export const client = Ohbug.setup({
  apiKey: "513d44f6-a2d3-443a-815d-597cbdcd7256",
  appType: "react",
  appVersion: __APP_VERSION__,
});
client.use(OhbugExtensionFeedback());
client.use(OhbugExtensionRrweb());
client.use(OhbugExtensionUUID());
client.use(OhbugExtensionView());
client.use(OhbugExtensionWebVitals());

export { OhbugErrorBoundary };
