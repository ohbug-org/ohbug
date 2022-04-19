import { getOhbugObject } from '@ohbug/utils'
import type { OhbugBaseDetail } from '@ohbug/types'
import { EventTypes } from '@ohbug/core'

export interface UnhandledrejectionErrorDetail extends OhbugBaseDetail {
  stack: string
}

export function unhandledrejectionErrorHandler(error: PromiseRejectionEvent) {
  const detail: UnhandledrejectionErrorDetail = {
    message: error.reason.message || error.reason,
    stack: error.reason.stack,
  }
  const { client } = getOhbugObject<Window>()
  const event = client.createEvent<UnhandledrejectionErrorDetail>({
    category: 'error',
    type: EventTypes.UNHANDLEDREJECTION_ERROR,
    detail,
  })
  client.notify(event)
}
