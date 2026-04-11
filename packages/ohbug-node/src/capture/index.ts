import { captureConsole, removeCaptureConsole } from "./captureConsole";
import {
  captureUncaughtException,
  removeCaptureUncaughtException,
} from "./captureUncaughtException";
import {
  captureUnhandledRejection,
  removeCaptureUnhandledRejection,
} from "./captureUnhandledRejection";

export { removeCaptureConsole };

export function captureProcess() {
  captureUncaughtException();
  captureUnhandledRejection();
}

export function removeCaptureProcess() {
  removeCaptureUncaughtException();
  removeCaptureUnhandledRejection();
}

export function handleCapture() {
  captureProcess();
  captureConsole();
}
