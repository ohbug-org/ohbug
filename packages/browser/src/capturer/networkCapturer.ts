import captureAjaxError from './child/captureAjaxError'
import captureFetchError from './child/captureFetchError'
import captureWebSocketError from './child/captureWebSocketError'

function networkCapturer() {
  captureAjaxError()
  captureFetchError()
  captureWebSocketError()
}

export default networkCapturer
