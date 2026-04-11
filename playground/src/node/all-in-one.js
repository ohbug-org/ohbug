/**
 * 综合测试：模拟一个 Node.js 应用的典型场景
 *
 * 运行: pnpm --filter playground node:all
 *
 * 这个示例模拟了一个服务启动后依次经历各种异常场景的过程。
 */
import { client } from "./setup.js";

console.log("[playground] === 综合测试开始 ===\n");

// 1. 设置用户和 metadata
client.setUser({ id: "server-1", name: "api-server" });
client.addMetadata("deployment", {
  region: "ap-east-1",
  env: "staging",
});

// 2. 模拟一些正常的 console 输出（会被记录为 action）
console.log("[app] 服务启动中...");
console.info("[app] 数据库连接成功");
console.warn("[app] 配置项 CACHE_TTL 未设置，使用默认值 300s");

// 3. 手动上报一个自定义事件
const event = client.createEvent({
  category: "message",
  type: "custom",
  detail: { message: "服务启动完成", port: 3000 },
});
if (event) {
  void client.notify(event);
}
console.log("[app] 服务启动完成\n");

// 4. 模拟业务中的 Promise 拒绝
setTimeout(() => {
  console.log("[app] 模拟数据库查询失败...");
  void Promise.reject(new Error("Connection refused: redis://localhost:6379"));
}, 500);

// 5. 最后模拟一个未捕获异常
setTimeout(() => {
  console.log("\n[app] 模拟未捕获异常...");
  const obj = null;
  void obj.property; // TypeError: Cannot read properties of null
}, 1500);
