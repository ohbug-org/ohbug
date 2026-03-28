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
      ],
    },
  },
  fmt: {
    sortImports: {},
    sortPackageJson: true,
    sortTailwindcss: {},
  },
});
