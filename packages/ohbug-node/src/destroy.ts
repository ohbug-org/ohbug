import { removeCaptureConsole, removeCaptureProcess } from "./capture";

export function destroy() {
  removeCaptureProcess();
  removeCaptureConsole();
  removeBeforeExitListener();
}

function beforeExitListener() {
  destroy();
}

function removeBeforeExitListener() {
  process.removeListener("beforeExit", beforeExitListener);
}

export function handleDestroy() {
  process.on("beforeExit", beforeExitListener);
}
