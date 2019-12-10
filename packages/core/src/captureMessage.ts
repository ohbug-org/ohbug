import createEvent from './createEvent'
import collector from './collector'
import { MESSAGE } from './types'
import { BaseDetail } from './interface'

interface CaptureMessageDetail extends BaseDetail {
  message: string
}

function captureMessage<T = Window>(message: string) {
  const event = createEvent<CaptureMessageDetail, T>(MESSAGE, {
    message
  })
  collector<T>(event)
}

export default captureMessage
