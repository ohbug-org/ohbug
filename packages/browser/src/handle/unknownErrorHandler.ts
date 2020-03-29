import { types, createEvent } from '@ohbug/core'
import { Event, BaseDetail } from '@ohbug/types'

const { UNKNOWN_ERROR } = types

export interface UnknownErrorDetail extends BaseDetail {}

function unknownErrorHandler(error: any, collect: (event: Event<UnknownErrorDetail>) => void) {
  const detail = error.message
    ? error
    : {
        message: error
      }
  const event = createEvent<UnknownErrorDetail>(UNKNOWN_ERROR, detail)
  collect(event)
}

export default unknownErrorHandler
