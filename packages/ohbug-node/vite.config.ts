import { defineConfig } from "vite-plus";

import pkg from "./package.json";

export default defineConfig({
  define: {
    __VERSION__: JSON.stringify(pkg.version),
  },
  run: {
    tasks: {
      build: {
        command: "vp pack",
        input: [{ auto: true }, "!dist/**", "!node_modules/**"],
      },
    },
  },
  pack: {
    dts: true,
    exports: true,
    sourcemap: true,
    define: {
      __VERSION__: JSON.stringify(pkg.version),
    },
  },
});
