import { OhbugBaseDetail } from '@ohbug/types'
import createEvent from './createEvent'
import collect from './collect'
import { MESSAGE } from './types'

interface CaptureMessageDetail extends OhbugBaseDetail {
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
  collect<T>(event)
}

export default captureMessage
