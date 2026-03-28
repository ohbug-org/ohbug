import ohbugUnplugin from ".";
import type { Options } from "./types";

/**
 * Nuxt module — registers the plugin for both webpack and vite.
 * Nuxt 模块 — 同时为 webpack 和 vite 注册插件。
 */
export default (options: Options): any => ({
  name: "unplugin-ohbug",
  hooks: {
    "vite:extendConfig": (viteConfig: { plugins?: unknown[] }) => {
      viteConfig.plugins = viteConfig.plugins ?? [];
      viteConfig.plugins.push(ohbugUnplugin.vite(options));
    },
    "webpack:config": (webpackConfigs: Array<{ plugins?: unknown[] }>) => {
      for (const config of webpackConfigs) {
        config.plugins = config.plugins ?? [];
        config.plugins.push(ohbugUnplugin.webpack(options));
      }
    },
  },
});
