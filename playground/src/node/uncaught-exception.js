/**
 * 测试未捕获异常 (uncaughtException)
 *
 * 运行: pnpm --filter playground node:uncaught
 *
 * 预期行为:
 *   1. Ohbug 捕获到异常并通过 notifier 上报
 *   2. 因为没有其他 uncaughtException 监听器，进程会以 exitCode=1 退出
 */
import "./setup.js";

console.log("[playground] 即将抛出未捕获异常...");

setTimeout(() => {
  throw new Error("这是一个未捕获的异常 (uncaughtException)");
}, 100);
