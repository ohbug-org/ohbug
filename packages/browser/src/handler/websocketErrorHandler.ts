import { types, WrappedIssue, createIssue } from '@ohbug/core'

const { WEBSOCKET_ERROR } = types

interface Detail {
  url: string
  timeStamp: number
  readyState: number
  protocol: string
  extensions: string
  binaryType: string
  bufferedAmount: number
}

function websocketErrorHandler(
  detail: Detail,
  collector: (WrappedIssue: WrappedIssue<Detail>) => void
) {
  const WrappedIssue = createIssue<Detail>(WEBSOCKET_ERROR, detail)
  collector(WrappedIssue)
}

export default websocketErrorHandler
