import { getOhbugObject } from '@ohbug/utils'
import type { OhbugBaseDetail } from '@ohbug/types'

import * as types from '../types'

const { WEBSOCKET_ERROR } = types

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
