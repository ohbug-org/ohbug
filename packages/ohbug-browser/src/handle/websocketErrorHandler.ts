import { getOhbugObject } from '@ohbug/utils'
import type { OhbugBaseDetail } from '@ohbug/types'
import { WEBSOCKET_ERROR } from '@ohbug/core'

export interface WebsocketErrorDetail extends OhbugBaseDetail {
  url: string
  timeStamp: number
  readyState: number
  protocol: string
  extensions: string
  binaryType: string
  bufferedAmount: number
}

export function websocketErrorHandler(detail: WebsocketErrorDetail) {
  const { client } = getOhbugObject<Window>()
  const event = client.createEvent<WebsocketErrorDetail>({
    category: 'error',
    type: WEBSOCKET_ERROR,
    detail,
  })
  client.notify(event)
}
