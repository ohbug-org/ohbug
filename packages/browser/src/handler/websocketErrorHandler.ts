import { types, Event, createEvent, BaseDetail } from '@ohbug/core'

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
  collector: (event: Event<WebsocketErrorDetail>) => void
) {
  const event = createEvent<WebsocketErrorDetail>(WEBSOCKET_ERROR, detail)
  collector(event)
}

export default websocketErrorHandler
