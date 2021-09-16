import { getGlobal, warning } from '@ohbug/utils'
import { WEBSOCKET_ERROR } from '@ohbug/core'

import { networkDispatcher } from '../../dispatch'
import { WebsocketErrorDetail } from '../../handle'

const global = getGlobal<Window>()

/**
 * capture WEBSOCKET_ERROR
 */
export function captureWebSocketError() {
  warning(
    'WebSocket' in global,
    'Binding `WebSocket` monitoring failed, the current environment did not find the object `WebSocket`'
  )
  if (!('WebSocket' in global)) return

  const wsProto = WebSocket?.prototype

  const backup = Object.getOwnPropertyDescriptor(wsProto, 'onerror')

  Object.defineProperty(wsProto, 'onerror', {
    set() {
      // eslint-disable-next-line prefer-rest-params
      const arg = arguments[0]
      backup?.set?.call(this, function call(e: any) {
        const {
          target: {
            url,
            readyState,
            protocol,
            extensions,
            binaryType,
            bufferedAmount,
          },
          timeStamp,
        } = e
        const detail: WebsocketErrorDetail = {
          url,
          timeStamp,
          readyState,
          protocol,
          extensions,
          binaryType,
          bufferedAmount,
        }
        networkDispatcher(WEBSOCKET_ERROR, detail)
        // eslint-disable-next-line prefer-rest-params
        arg.apply(this, arguments)
      })
    },
  })
}
