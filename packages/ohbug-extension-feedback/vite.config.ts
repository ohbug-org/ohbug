import { resolve } from "node:path";
import { fileURLToPath } from "node:url";

import tailwindcss from "@tailwindcss/vite";
import dts from "vite-plugin-dts";
import solidPlugin from "vite-plugin-solid";
import { defineConfig } from "vite-plus";

import libInjectCss from "./lib-inject-css";

const __dirname = fileURLToPath(new URL(".", import.meta.url));
const name = "OhbugExtensionFeedback";

export default defineConfig({
  run: {
    tasks: {
      build: {
        command: "node build.mjs",
        input: [{ auto: true }, "!dist/**", "!node_modules/**"],
      },
    },
  },
  build: {
    lib: {
      entry: resolve(__dirname, "src/index.tsx"),
      name,
      formats: ["es"],
      fileName: () => "index.mjs",
    },
    rollupOptions: {
      external: ["@ohbug/types", "@ohbug/utils"],
    },
  },
  plugins: [
    tailwindcss(),
    solidPlugin(),
    dts({
      include: ["src/**/*"],
      tsconfigPath: "./tsconfig.json",
      pathsToAliases: false,
    }),
    libInjectCss(),
  ],
});
