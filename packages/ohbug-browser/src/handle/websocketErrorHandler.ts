import { getOhbugObject } from '@ohbug/utils'
import type { OhbugBaseDetail } from '@ohbug/types'
import { EventTypes } from '@ohbug/core'

export interface WebsocketErrorDetail extends OhbugBaseDetail {
  url: string
  timeStamp: number
  readyState: number
}

export function websocketErrorHandler(detail: WebsocketErrorDetail) {
  const { client } = getOhbugObject<Window>()
  const event = client.createEvent<WebsocketErrorDetail>({
    category: 'error',
    type: EventTypes.WEBSOCKET_ERROR,
    detail,
  })
  client.notify(event)
}
