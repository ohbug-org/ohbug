import { unhandledRejectionHandler } from "../handle/unhandledRejectionHandler";

function listener(reason: unknown, promise: Promise<unknown>) {
  unhandledRejectionHandler(reason, promise);
}

export function captureUnhandledRejection() {
  process.on("unhandledRejection", listener);
}

export function removeCaptureUnhandledRejection() {
  process.removeListener("unhandledRejection", listener);
}
