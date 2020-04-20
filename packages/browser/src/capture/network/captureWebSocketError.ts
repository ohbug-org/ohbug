import { getGlobal, warning } from '@ohbug/utils'
import { types } from '@ohbug/core'
import { networkDispatcher } from '../../dispatch'

const global = getGlobal<Window>()
const { WEBSOCKET_ERROR } = types

/**
 * capture WEBSOCKET_ERROR
 */
function captureWebSocketError() {
  warning(
    'WebSocket' in global,
    'Ohbug: Binding `WebSocket` monitoring failed, the current environment did not find the object `WebSocket`'
  )
  if (!('WebSocket' in global)) return

  const wsProto = WebSocket.prototype

  const backup = Object.getOwnPropertyDescriptor(wsProto, 'onerror')

  Object.defineProperty(wsProto, 'onerror', {
    set() {
      const arg = arguments[0]
      // @ts-ignore
      backup.set.call(this, function (e) {
        const {
          target: { url, readyState, protocol, extensions, binaryType, bufferedAmount },
          timeStamp,
        } = e
        networkDispatcher(WEBSOCKET_ERROR, {
          url,
          timeStamp,
          readyState,
          protocol,
          extensions,
          binaryType,
          bufferedAmount,
        })
        arg.apply(this, arguments)
      })
    },
  })
}

export default captureWebSocketError
