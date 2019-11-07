import { getGlobal, warning } from '@ohbug/utils'
import { types } from '@ohbug/core'
import { networkDispatcher } from '../../dispatcher'

const global = getGlobal<Window>()
const { WEBSOCKET_ERROR } = types

/**
 * 用于捕获 WEBSOCKET_ERROR
 */
function captureWebSocketError() {
  warning('WebSocket' in global, 'Ohbug: 绑定 `WebSocket` 监控失败，当前环境未发现对象 `WebSocket`')
  if (!('WebSocket' in global)) return

  const wsProto = WebSocket.prototype

  const backup = Object.getOwnPropertyDescriptor(wsProto, 'onerror')

  Object.defineProperty(wsProto, 'onerror', {
    set() {
      const arg = arguments[0]
      // @ts-ignore
      backup.set.call(this, function(e) {
        const {
          target: { url, readyState, protocol, extensions, binaryType, bufferedAmount },
          timeStamp
        } = e
        networkDispatcher(WEBSOCKET_ERROR, {
          url,
          timeStamp,
          readyState,
          protocol,
          extensions,
          binaryType,
          bufferedAmount
        })
        arg.apply(this, arguments)
      })
    }
  })
}

export default captureWebSocketError
