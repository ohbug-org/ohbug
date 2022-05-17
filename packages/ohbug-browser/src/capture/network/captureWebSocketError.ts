import { getGlobal } from '@ohbug/utils'
import { EventTypes } from '@ohbug/core'

import { networkDispatcher } from '../../dispatch'
import type { WebsocketErrorDetail } from '../../handle'

const global = getGlobal<Window>()

/**
 * capture WEBSOCKET_ERROR
 */
export function captureWebSocketError() {
  if (!('WebSocket' in global)) return

  const wsProto = WebSocket?.prototype

  const backup = Object.getOwnPropertyDescriptor(wsProto, 'onerror')

  // eslint-disable-next-line accessor-pairs
  Object.defineProperty(wsProto, 'onerror', {
    set() {
      // eslint-disable-next-line prefer-rest-params
      const args = arguments
      const arg = args[0]
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
        networkDispatcher(EventTypes.WEBSOCKET_ERROR, detail)
        arg.apply(this, args)
      })
    },
  })
}
