import { types, createEvent } from '@ohbug/core'
import { OhbugEvent, OhbugBaseDetail } from '@ohbug/types'

const { UNHANDLEDREJECTION_ERROR } = types

export interface UnhandledrejectionErrorDetail extends OhbugBaseDetail {
  stack: string
}

function unhandledrejectionErrorHandler(
  error: PromiseRejectionEvent,
  collect: (event: OhbugEvent<UnhandledrejectionErrorDetail>) => void
) {
  const event = createEvent<UnhandledrejectionErrorDetail>(UNHANDLEDREJECTION_ERROR, {
    message: error.reason.message || error.reason,
    stack: error.reason.stack
  })
  collect(event)
}

export default unhandledrejectionErrorHandler
