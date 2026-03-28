import { unlink } from "node:fs/promises";
import { resolve } from "node:path";

import { uploadSourceMap } from "@ohbug/cli";
import { createUnplugin } from "unplugin";
import type { UnpluginFactory } from "unplugin";
import type { Compilation, Compiler } from "webpack";

import type { Asset, Options } from "./types";

const NAME = "unplugin-ohbug";
const LOG_PREFIX = "[UnpluginOhbug]";

/**
 * Extract sourcemap assets from webpack compilation stats.
 * 从 webpack 编译统计中提取 sourcemap 资源。
 */
function getAssets(
  compiler: Compiler,
  compilation: Compilation,
  options: Options,
): Asset[] | undefined {
  const { chunks } = compilation.getStats().toJson();
  const outputPath = compilation.getPath(compiler.outputPath, {});

  return chunks?.reduce<Asset[]>((result, chunk) => {
    const filename =
      chunk.files?.find((file) => file.endsWith(".js.map")) ??
      chunk.auxiliaryFiles?.find((file) => file.endsWith(".js.map"));
    if (!filename) return result;

    const path =
      compiler.outputFileSystem?.join?.(outputPath, filename) ?? `${outputPath}/${filename}`;

    return [...result, { ...options, path }];
  }, []);
}

/**
 * Delete sourcemap files after successful upload (if enabled).
 * 上传成功后删除 sourcemap 文件（如果启用）。
 */
async function deleteSourceMaps(assets: Asset[], options: Options): Promise<void> {
  if (options.deleteAfterUploading) {
    await Promise.all(assets.map((asset) => unlink(asset.path)));
  }
}

function validateOptions(options: Options): void {
  if (typeof options?.apiKey !== "string" || options.apiKey.length < 1) {
    throw new Error(`${LOG_PREFIX} "apiKey" is required!`);
  }
  if (typeof options.appVersion !== "string" || options.appVersion.length < 1) {
    throw new Error(`${LOG_PREFIX} "appVersion" is required!`);
  }
}

/**
 * Collect sourcemap assets from Rollup/Vite output bundle.
 * 从 Rollup/Vite 输出 bundle 中收集 sourcemap 资源。
 */
function collectAssetsFromBundle(
  options: Options,
  outputOptions: { dir?: string },
  outputBundle: Record<string, { map?: unknown; fileName: string }>,
): Asset[] {
  return Object.keys(outputBundle)
    .map((key) => {
      const value = outputBundle[key];
      if (value?.map) {
        const path = resolve(outputOptions.dir ?? ".", `${value.fileName}.map`);
        return { ...options, path };
      }
      return null;
    })
    .filter((v): v is Asset => v !== null);
}

export const unpluginFactory: UnpluginFactory<Options> = (options) => ({
  name: NAME,

  // Rollup / Vite writeBundle hook
  // Rollup / Vite 钩子
  rollup: {
    writeBundle(
      outputOptions: { dir?: string },
      outputBundle: Record<string, { map?: unknown; fileName: string }>,
    ) {
      validateOptions(options);
      const assets = collectAssetsFromBundle(options, outputOptions, outputBundle);
      void Promise.all(assets.map((asset) => uploadSourceMap(asset))).then(() =>
        deleteSourceMaps(assets, options),
      );
    },
  },

  vite: {
    writeBundle(
      outputOptions: { dir?: string },
      outputBundle: Record<string, { map?: unknown; fileName: string }>,
    ) {
      validateOptions(options);
      const assets = collectAssetsFromBundle(options, outputOptions, outputBundle);
      void Promise.all(assets.map((asset) => uploadSourceMap(asset))).then(() =>
        deleteSourceMaps(assets, options),
      );
    },
  },

  // Webpack hook
  // Webpack 钩子
  webpack(compiler) {
    validateOptions(options);
    const plugin = async (compilation: Compilation): Promise<void> => {
      const assets = getAssets(compiler, compilation, options);

      if (assets?.length) {
        await Promise.all(assets.map((asset) => uploadSourceMap(asset)));
        await deleteSourceMaps(assets, options);
      }
    };

    if (compiler.hooks?.afterEmit) {
      compiler.hooks.afterEmit.tapPromise(NAME, plugin);
    }
  },
});

export const ohbugUnplugin = /* #__PURE__ */ createUnplugin(unpluginFactory);

export default ohbugUnplugin;
export type { Asset, Config, Options } from "./types";
