/**
 * 测试 console 捕获（记录为 action/breadcrumb）
 *
 * 运行: pnpm --filter playground node:console
 *
 * 预期行为:
 *   1. console.log/info/warn/error 被包装，调用时记录为 action
 *   2. 包含 "Ohbug" 的内部日志被跳过，不记录为 action
 *   3. 原始 console 方法仍然正常输出
 *   4. 当后续创建事件时，这些 action 会附带在事件中作为上下文
 */
import { client } from "./setup.js";

console.log("[playground] 开始测试 console 捕获...");

// 这些都会被记录为 action
console.log("普通 log 消息");
console.info("info 级别消息");
console.warn("warn 级别消息");
console.error("error 级别消息");

// 创建事件来验证 action 上下文
setTimeout(() => {
  const event = client.createEvent({
    category: "message",
    type: "custom",
    detail: { message: "测试 console action 上下文" },
  });
  if (event) {
    console.log("[playground] 事件 actions:", JSON.stringify(event.actions, null, 2));
  }

  console.log("[playground] console 捕获测试完成");
  process.exit(0);
}, 100);
