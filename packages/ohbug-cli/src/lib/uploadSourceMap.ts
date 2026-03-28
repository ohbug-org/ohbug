import { stat } from "node:fs/promises";
import { resolve } from "node:path";

import fg from "fast-glob";

import { DEFAULT_ENDPOINT, LOG_PREFIX } from "./constants";
import request from "./request";

export interface UploadSourceMapCommand {
  /**
   * The target directory — either a source map file path or a directory containing source maps
   * 目标路径 — 可以是单个 source map 文件路径，也可以是包含 source map 的目录
   */
  path: string;
}

export interface UploadSourceMapOptions {
  /**
   * Your project API key
   * 项目 API key
   */
  apiKey: string;
  /**
   * The version number of your app
   * 应用版本号
   */
  appVersion: string;
  /**
   * The type of your app
   * 应用类型
   */
  appType?: string;
  /**
   * The url of the upload server
   * 上传服务器的 URL
   */
  endpoint?: string;
}

export type UploadSourceMap = UploadSourceMapCommand & UploadSourceMapOptions;

/**
 * Upload source map files to the Ohbug server.
 * Supports both a single file path and a directory (recursively finds all .js.map files).
 * 上传 source map 文件到 Ohbug 服务器。
 * 支持单个文件路径和目录（递归查找所有 .js.map 文件）。
 */
export default async function uploadSourceMap({
  path,
  apiKey,
  appVersion,
  appType,
  endpoint = DEFAULT_ENDPOINT,
}: UploadSourceMap): Promise<Response | Response[] | null> {
  const stats = await stat(path);
  const data = { apiKey, appVersion, appType };

  if (stats.isFile()) {
    const file = resolve(path);
    try {
      return await request({ endpoint, file, data });
    } catch (error) {
      throw new Error(`${LOG_PREFIX} Uploading file ${file} failed!\n${String(error)}`);
    }
  }

  if (stats.isDirectory()) {
    // Find all .js.map files in the specified directory and upload them one by one.
    // 在指定目录中查找所有 .js.map 文件并逐一上传。
    const list = fg.sync(resolve(path, "./**/*.js.map"));
    if (list.length === 0) {
      throw new Error(`${LOG_PREFIX} No matching source map files!`);
    }
    try {
      return await Promise.all(list.map((file) => request({ endpoint, file, data })));
    } catch (error) {
      throw new Error(`${LOG_PREFIX} Uploading file ${list.join(",")} failed!\n${String(error)}`);
    }
  }

  return null;
}
