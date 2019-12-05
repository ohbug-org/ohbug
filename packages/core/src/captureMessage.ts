import createIssue from './createIssue'
import collector from './collector'
import { MESSAGE } from './types'
import { BaseDetail } from './interface'

interface CaptureMessageDetail extends BaseDetail {
  message: string
}

function captureMessage<T = Window>(message: string) {
  const wrappedIssue = createIssue<CaptureMessageDetail, T>(MESSAGE, {
    message
  })
  collector<T>(wrappedIssue)
}

export default captureMessage
