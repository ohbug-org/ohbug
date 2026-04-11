import { getOhbugObject } from "@ohbug/utils";

import { uncaughtExceptionHandler } from "../handle/uncaughtExceptionHandler";

// 参考 Sentry：确保事件发送后，进程正常退出。
// 注册了 uncaughtException 监听器后，Node 不会自动退出进程。
// 如果用户没有注册其他监听器，由我们负责退出进程。
// 给 notifier 2 秒的时间来 flush 事件，然后强制退出。
const SHUTDOWN_TIMEOUT = 2000;

// 重入保护：防止多个快速连续的异常触发竞争的 process.exit 调用
let exiting = false;

function listener(error: Error, origin: string) {
  let notifyPromise: Promise<void>;
  try {
    notifyPromise = uncaughtExceptionHandler(error, origin);
  } catch {
    // client 已销毁或未初始化，无法上报
    return;
  }

  if (exiting) return;

  let client;
  try {
    ({ client } = getOhbugObject());
  } catch {
    return;
  }

  const listeners = process.listeners("uncaughtException").filter((l) => l !== listener);
  if (listeners.length === 0) {
    exiting = true;
    client.__logger.error("No other uncaughtException listeners detected. Exiting process.");
    // 等待 notify 完成后退出，设置超时兜底防止 hang
    void notifyPromise.finally(() => {
      process.exit(1);
    });
    setTimeout(() => {
      process.exit(1);
    }, SHUTDOWN_TIMEOUT).unref();
  }
}

export function captureUncaughtException() {
  exiting = false;
  process.on("uncaughtException", listener);
}

export function removeCaptureUncaughtException() {
  process.removeListener("uncaughtException", listener);
  exiting = false;
}
