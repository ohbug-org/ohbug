import { types, createEvent } from '@ohbug/core'
import { Event, BaseDetail } from '@ohbug/types'

const { WEBSOCKET_ERROR } = types

export interface WebsocketErrorDetail extends BaseDetail {
  url: string
  timeStamp: number
  readyState: number
  protocol: string
  extensions: string
  binaryType: string
  bufferedAmount: number
}

function websocketErrorHandler(
  detail: WebsocketErrorDetail,
  collect: (event: Event<WebsocketErrorDetail>) => void
) {
  const event = createEvent<WebsocketErrorDetail>(WEBSOCKET_ERROR, detail)
  collect(event)
}

export default websocketErrorHandler
