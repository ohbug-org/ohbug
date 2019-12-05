import { types, WrappedIssue, createIssue, BaseDetail } from '@ohbug/core'

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
  collector: (WrappedIssue: WrappedIssue<WebsocketErrorDetail>) => void
) {
  const WrappedIssue = createIssue<WebsocketErrorDetail>(WEBSOCKET_ERROR, detail)
  collector(WrappedIssue)
}

export default websocketErrorHandler
