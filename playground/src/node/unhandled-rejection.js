/**
 * 测试未处理的 Promise 拒绝 (unhandledRejection)
 *
 * 运行: pnpm --filter playground node:rejection
 *
 * 预期行为:
 *   1. Ohbug 捕获到 rejection 并通过 notifier 上报
 *   2. Node 15+ 默认会在 unhandledRejection 后退出进程
 */
import "./setup.js";

console.log("[playground] 即将触发未处理的 Promise 拒绝...");

// 场景 1: Error 对象作为 rejection reason
void Promise.reject(new Error("这是一个未处理的 Promise 拒绝 (Error)"));

// 场景 2: 字符串作为 rejection reason
setTimeout(() => {
  void Promise.reject("这是一个字符串类型的 rejection reason");
}, 200);
