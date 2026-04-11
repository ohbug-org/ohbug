/**
 * 共享的 Ohbug Node 初始化配置。
 * 所有示例通过 import { client } from "./setup.js" 获取已初始化的 client。
 */
import Ohbug from "@ohbug/node";

export const client = Ohbug.setup({
  apiKey: "513d44f6-a2d3-443a-815d-597cbdcd7256",
  endpoint: "http://localhost:6660",
  appType: "node",
  appVersion: "0.0.1",
});
