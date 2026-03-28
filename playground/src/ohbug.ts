import Ohbug from "@ohbug/browser";
import OhbugExtensionFeedback from "@ohbug/extension-feedback";
import OhbugExtensionRrweb from "@ohbug/extension-rrweb";
import OhbugExtensionUUID from "@ohbug/extension-uuid";
import OhbugExtensionView from "@ohbug/extension-view";
import OhbugExtensionWebVitals from "@ohbug/extension-web-vitals";
import { OhbugErrorBoundary } from "@ohbug/react";

export const client = Ohbug.setup({
  apiKey: "180b265c-8d05-46fa-8f8a-d94e9ecbb717",
  appType: "react",
  appVersion: __APP_VERSION__,
});
client.use(OhbugExtensionFeedback());
client.use(OhbugExtensionRrweb());
client.use(OhbugExtensionUUID());
client.use(OhbugExtensionView());
client.use(OhbugExtensionWebVitals());

export { OhbugErrorBoundary };
