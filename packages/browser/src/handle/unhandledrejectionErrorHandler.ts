import { types, createEvent } from '@ohbug/core'
import type { OhbugEvent, OhbugBaseDetail } from '@ohbug/types'

const { UNHANDLEDREJECTION_ERROR } = types

export interface UnhandledrejectionErrorDetail extends OhbugBaseDetail {
  stack: string
}

function unhandledrejectionErrorHandler(
  error: PromiseRejectionEvent,
  collect: (event: OhbugEvent<UnhandledrejectionErrorDetail>) => void
) {
  const detail: UnhandledrejectionErrorDetail = {
    message: error.reason.message || error.reason,
    stack: error.reason.stack,
  }
  const event = createEvent<UnhandledrejectionErrorDetail>(UNHANDLEDREJECTION_ERROR, detail)
  collect(event)
}

export default unhandledrejectionErrorHandler
