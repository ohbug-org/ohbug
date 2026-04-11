import OhbugUnplugin from "@ohbug/unplugin/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite-plus";

import pkg from "./package.json";

export default defineConfig({
  define: { __APP_VERSION__: JSON.stringify(pkg.version) },
  plugins: [
    react(),
    OhbugUnplugin({
      apiKey: "513d44f6-a2d3-443a-815d-597cbdcd7256",
      appVersion: pkg.version,
      appType: "react",
    }),
  ],
  build: { sourcemap: true },
  server: { port: 4000 },
});
