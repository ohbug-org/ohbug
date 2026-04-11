/**
 * 测试手动创建和上报自定义事件
 *
 * 运行: pnpm --filter playground node:custom
 *
 * 预期行为:
 *   1. 通过 client.createEvent() 创建自定义事件
 *   2. 通过 client.notify() 上报事件
 *   3. 可以附加 metadata 和 user 信息
 */
import { client } from "./setup.js";

console.log("[playground] 开始测试自定义事件...");

// 设置用户信息
client.setUser({
  id: "user-123",
  name: "test-user",
  email: "test@example.com",
});

// 添加自定义 metadata
client.addMetadata("app", {
  module: "playground-node",
  feature: "custom-event-test",
});

// 创建并上报自定义错误事件
const errorEvent = client.createEvent({
  category: "error",
  type: "custom",
  detail: {
    message: "手动上报的自定义错误",
    code: "CUSTOM_001",
    context: { foo: "bar" },
  },
});
if (errorEvent) {
  void client.notify(errorEvent);
}

// 创建并上报自定义消息事件
const messageEvent = client.createEvent({
  category: "message",
  type: "custom",
  detail: {
    message: "这是一条手动上报的消息",
    level: "info",
  },
});
if (messageEvent) {
  void client.notify(messageEvent);
}

console.log("[playground] 自定义事件已上报");

setTimeout(() => {
  console.log("[playground] 自定义事件测试完成");
  process.exit(0);
}, 500);
