import { BaseDetail } from '@ohbug/types'
import createEvent from './createEvent'
import collector from './collector'
import { MESSAGE } from './types'

interface CaptureMessageDetail extends BaseDetail {
  message: string
}

function captureMessage<T = Window>(message: string) {
  const event = createEvent<CaptureMessageDetail, T>(
    MESSAGE,
    {
      message
    },
    'message'
  )
  collector<T>(event)
}

export default captureMessage
