/* eslint-disable no-console */

import { getOhbugObject, replace } from "@ohbug/utils";

type Level = "log" | "info" | "warn" | "error";
const levels: Level[] = ["log", "info", "warn", "error"];
const consoleOriginal: Record<Level, any> = {
  log: console.log,
  info: console.info,
  warn: console.warn,
  error: console.error,
};

// 幂等保护：防止重复调用 captureConsole 导致 consoleOriginal 被覆盖为包装后的函数
let captured = false;

export function captureConsole() {
  if (captured) return;
  captured = true;

  const { client } = getOhbugObject();
  levels.forEach((level) => {
    consoleOriginal[level] = replace(
      console,
      level,
      (origin) =>
        function call(this: any, ...args: any[]) {
          const isOhbugConsole = args.some(
            (arg) => typeof arg === "string" && arg.includes("Ohbug"),
          );
          if (!isOhbugConsole) {
            client.addAction(`console.${level}`, args, "console");
          }

          return origin.apply(this, args);
        },
    );
  });
}

export function removeCaptureConsole() {
  if (!captured) return;
  captured = false;

  if (console) {
    levels.forEach((level) => {
      console[level] = consoleOriginal[level];
    });
  }
}
