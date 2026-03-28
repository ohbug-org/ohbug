import { defineConfig } from "vite-plus";

export default defineConfig({
  staged: {
    "*": "vp check --fix",
  },
  lint: {
    options: {
      typeAware: true,
      typeCheck: true,
    },
  },
  test: {
    include: ["packages/**/src/**/*.test.ts", "packages/**/__tests__/**/*.test.ts"],
    environment: "jsdom",
    coverage: {
      provider: "v8",
      include: ["packages/**/src/**/*.ts"],
      exclude: [
        "packages/**/src/**/*.test.ts",
        "packages/**/__tests__/**",
        "packages/**/src/index.ts",
        "packages/ohbug-types/**",
        "packages/ohbug-vue/src/types.ts",
        "packages/ohbug-browser/src/dispatch/index.ts",
        "packages/ohbug-browser/src/handle/index.ts",
        // WebSocket onerror property descriptor not testable in jsdom
        "packages/ohbug-browser/src/capture/network/captureWebSocketError.ts",
        // EventTarget.prototype replacement breaks jsdom validation
        "packages/ohbug-browser/src/replaceAddEventListener.ts",
      ],
    },
  },
  fmt: {
    sortImports: {},
    sortPackageJson: true,
    sortTailwindcss: {},
  },
});
