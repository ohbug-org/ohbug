import { existsSync, readdirSync, readFileSync } from "node:fs";
import { resolve } from "node:path";

import { defineConfig } from "vite-plus";

// Dynamically generate resolve aliases for all @ohbug/* workspace packages.
// This ensures Vitest resolves workspace imports to source files (not dist),
// so tests work without a prior build step.
// 动态生成所有 @ohbug/* 工作区包的 resolve alias，
// 确保 Vitest 直接解析到源码而非 dist 构建产物，测试无需先执行构建。

// @ohbug/types is a types-only package (only .d.ts files) — skip alias so
// Vite resolves it through the package.json "types" condition instead.
// @ohbug/types 是纯类型包（仅含 .d.ts 文件），跳过 alias 让 Vite 通过
// package.json 的 "types" 条件解析。
const TYPES_ONLY_PACKAGES = new Set(["ohbug-types"]);

const ohbugPackages = readdirSync(resolve(import.meta.dirname, "packages"), {
  withFileTypes: true,
})
  .filter((d) => d.isDirectory() && d.name.startsWith("ohbug-") && !TYPES_ONLY_PACKAGES.has(d.name))
  .map((d) => d.name);

const workspaceAlias: Record<string, string> = {};
for (const pkg of ohbugPackages) {
  const name = `@ohbug/${pkg.replace("ohbug-", "")}`;
  workspaceAlias[name] = resolve(import.meta.dirname, `packages/${pkg}/src`);
}

// Per-package vite.config.ts defines __VERSION__ for the build step (vp pack),
// but vitest uses the root config — so we define it here for tests.
const versionDefine: Record<string, string> = {};
for (const pkg of ohbugPackages) {
  const versionTsPath = resolve(import.meta.dirname, `packages/${pkg}/src/version.ts`);
  if (existsSync(versionTsPath)) {
    const pkgJsonPath = resolve(import.meta.dirname, `packages/${pkg}/package.json`);
    const pkgJson = JSON.parse(readFileSync(pkgJsonPath, "utf-8"));
    versionDefine.__VERSION__ = JSON.stringify(pkgJson.version);
    break;
  }
}

export default defineConfig({
  define: versionDefine,
  resolve: {
    alias: workspaceAlias,
  },
  run: {
    cache: {
      scripts: true,
      tasks: true,
    },
  },
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
        // Extension-feedback uses SolidJS with custom vite build
        "packages/ohbug-extension-feedback/**",
      ],
    },
  },
  fmt: {
    sortImports: {},
    sortPackageJson: true,
    sortTailwindcss: {},
  },
});
