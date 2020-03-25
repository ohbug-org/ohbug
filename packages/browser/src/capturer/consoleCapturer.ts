import captureConsole, { removeCaptureConsole } from './console/captureConsole'

function consoleCapturer() {
  captureConsole()
}

export function removeConsoleCapturer() {
  removeCaptureConsole()
}

export default consoleCapturer
