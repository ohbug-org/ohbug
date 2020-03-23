import captureAjaxError, { removeCaptureAjaxError } from './network/captureAjaxError'
import captureFetchError, { removeCaptureFetchError } from './network/captureFetchError'
import captureWebSocketError from './network/captureWebSocketError'

function networkCapturer() {
  captureAjaxError()
  captureFetchError()
  captureWebSocketError()
}

export function removeNetworkCapturer() {
  removeCaptureAjaxError()
  removeCaptureFetchError()
}

export default networkCapturer
