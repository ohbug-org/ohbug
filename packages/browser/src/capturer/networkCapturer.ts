import captureAjaxError from './network/captureAjaxError'
import captureFetchError from './network/captureFetchError'
import captureWebSocketError from './network/captureWebSocketError'

function networkCapturer() {
  captureAjaxError()
  captureFetchError()
  captureWebSocketError()
}

export default networkCapturer
