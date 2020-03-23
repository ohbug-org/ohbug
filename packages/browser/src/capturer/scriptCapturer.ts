import { getGlobal, warning } from '@ohbug/utils'

import captureUncaughtError, { removeCaptureUncaughtError } from './script/captureUncaughtError'
import captureUnhandledrejectionError, {
  removeCaptureUnhandledrejectionError
} from './script/captureUnhandledrejectionError'

const global = getGlobal<Window>()

function scriptCapturer() {
  warning(
    Boolean(global.addEventListener),
    'Ohbug: Binding script monitoring failed, the current environment did not find the object `addEventListener`'
  )
  if (!global.addEventListener) return

  // @ts-ignore
  if (global.addEventListener) {
    captureUncaughtError()
    captureUnhandledrejectionError()
  }
}

export function removeScriptCapturer() {
  removeCaptureUncaughtError()
  removeCaptureUnhandledrejectionError()
}

export default scriptCapturer
