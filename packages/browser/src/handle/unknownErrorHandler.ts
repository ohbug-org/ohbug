import { types, createEvent } from '@ohbug/core'
import { OhbugEvent, OhbugBaseDetail } from '@ohbug/types'

const { UNKNOWN_ERROR } = types

export interface UnknownErrorDetail extends OhbugBaseDetail {}

function unknownErrorHandler(error: any, collect: (event: OhbugEvent<UnknownErrorDetail>) => void) {
  const detail = error.message
    ? error
    : {
        message: error
      }
  const event = createEvent<UnknownErrorDetail>(UNKNOWN_ERROR, detail)
  collect(event)
}

export default unknownErrorHandler
