import { readFile } from "node:fs/promises";
import { basename } from "node:path";

import chalk from "chalk";
import ora from "ora";

import { LOG_PREFIX, TIMEOUT } from "./constants";

export interface RequestOptions {
  /**
   * The url of the upload server
   * 上传服务器的 URL
   */
  endpoint: string;
  /**
   * The path of the source map file (local)
   * source map 文件的本地路径
   */
  file: string;
  /**
   * Additional form data fields
   * 额外的表单数据字段
   */
  data?: Record<string, string | undefined>;
}

/**
 * Upload a single file to the endpoint via multipart/form-data using native fetch.
 * 使用原生 fetch 以 multipart/form-data 格式上传单个文件到指定端点。
 */
export default async function request({ endpoint, file, data }: RequestOptions): Promise<Response> {
  if (!endpoint) throw new Error(`${LOG_PREFIX} No endpoint matches!`);
  if (!file) throw new Error(`${LOG_PREFIX} No ".map" file matches!`);

  const spinner = ora(`${chalk.cyan("Upload:")} ${chalk.underline(file)}`).start();

  try {
    const buffer = await readFile(file);
    const blob = new Blob([buffer]);
    const formData = new FormData();
    formData.append("file", blob, basename(file));

    if (data) {
      for (const [key, value] of Object.entries(data)) {
        if (value) formData.append(key, value);
      }
    }

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), TIMEOUT);

    const response = await fetch(endpoint, {
      method: "POST",
      body: formData,
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (response.ok) {
      spinner.succeed();
      return response;
    }

    throw new Error(
      `${LOG_PREFIX} HTTP status ${String(response.status)} received from uploadSourceMap API`,
    );
  } catch (error) {
    spinner.fail();
    throw error;
  }
}
