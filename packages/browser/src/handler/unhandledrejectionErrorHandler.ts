import { types, Event, createEvent } from '@ohbug/core'

const { UNHANDLEDREJECTION_ERROR } = types

export interface UnhandledrejectionErrorDetail {
  message: string
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
