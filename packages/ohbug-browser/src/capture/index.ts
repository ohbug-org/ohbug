import { getGlobal, warning } from '@ohbug/utils'
import {
  captureUrlChange,
  removeCaptureUrlChange,
} from './action/captureUrlChange'
import { captureClick, removeCaptureClick } from './action/captureClick'
import { captureConsole, removeCaptureConsole } from './console/captureConsole'
import {
  captureAjaxError,
  removeCaptureAjaxError,
} from './network/captureAjaxError'
import {
  captureFetchError,
  removeCaptureFetchError,
} from './network/captureFetchError'
import { captureWebSocketError } from './network/captureWebSocketError'
import {
  captureUncaughtError,
  removeCaptureUncaughtError,
} from './script/captureUncaughtError'
import {
  captureUnhandledrejectionError,
  removeCaptureUnhandledrejectionError,
} from './script/captureUnhandledrejectionError'

export function captureAction() {
  captureUrlChange()
  captureClick()
}
export function removeCaptureAction() {
  removeCaptureUrlChange()
  removeCaptureClick()
}

export { captureConsole, removeCaptureConsole }

export function captureNetwork() {
  captureAjaxError()
  captureFetchError()
  captureWebSocketError()
}
export function removeCaptureNetwork() {
  removeCaptureAjaxError()
  removeCaptureFetchError()
}

export function captureScript() {
  const _global = getGlobal<Window>()
  warning(
    Boolean(_global.addEventListener),
    'Binding script monitoring failed, the current environment did not find the object `addEventListener`'
  )
  if (!_global.addEventListener) return

  captureUncaughtError()
  captureUnhandledrejectionError()
}
export function removeCaptureScript() {
  removeCaptureUncaughtError()
  removeCaptureUnhandledrejectionError()
}

export function handleCapture() {
  captureScript()
  captureNetwork()
  captureAction()
  captureConsole()
}
