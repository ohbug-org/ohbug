import { getGlobal, warning } from '@ohbug/utils'

import * as types from '../../types'
import { networkDispatcher } from '../../dispatch'
import { WebsocketErrorDetail } from '../../handle'

const _global = getGlobal<Window>()
const { WEBSOCKET_ERROR } = types

/**
 * capture WEBSOCKET_ERROR
 */
export function captureWebSocketError() {
  warning(
    'WebSocket' in _global,
    'Binding `WebSocket` monitoring failed, the current environment did not find the object `WebSocket`'
  )
  if (!('WebSocket' in _global)) return

  const wsProto = WebSocket?.prototype

  const backup = Object.getOwnPropertyDescriptor(wsProto, 'onerror')

  Object.defineProperty(wsProto, 'onerror', {
    set() {
      // eslint-disable-next-line prefer-rest-params
      const arg = arguments[0]
      // @ts-ignore
      backup.set.call(this, function (e) {
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
        // @ts-ignore
        // eslint-disable-next-line prefer-rest-params
        arg.apply(this, arguments)
      })
    },
  })
}
