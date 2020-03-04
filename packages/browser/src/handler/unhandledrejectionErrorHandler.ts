import { types, createEvent } from '@ohbug/core'
import { Event, BaseDetail } from '@ohbug/types'

const { UNHANDLEDREJECTION_ERROR } = types

export interface UnhandledrejectionErrorDetail extends BaseDetail {
  stack: string
}

function unhandledrejectionErrorHandler(
  error: PromiseRejectionEvent,
  collector: (event: Event<UnhandledrejectionErrorDetail>) => void
) {
  const event = createEvent<UnhandledrejectionErrorDetail>(UNHANDLEDREJECTION_ERROR, {
    message: error.reason.message || error.reason,
    stack: error.reason.stack
  })
  collector(event)
}

export default unhandledrejectionErrorHandler
