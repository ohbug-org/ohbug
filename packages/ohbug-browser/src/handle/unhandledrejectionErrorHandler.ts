import { getOhbugObject } from '@ohbug/utils'
import type { OhbugBaseDetail } from '@ohbug/types'
import { EventTypes } from '@ohbug/core'
import ErrorStackParser from 'error-stack-parser'

export interface UnhandledrejectionErrorDetail extends OhbugBaseDetail {
  name: string
  filename?: string
  lineno?: number
  colno?: number
  stack: string
}

export function unhandledrejectionErrorHandler(e: PromiseRejectionEvent) {
  const detail: UnhandledrejectionErrorDetail = {
    name: e?.reason?.name,
    message: e?.reason?.message || e?.reason,
    stack: e?.reason?.stack,
  }
  if (e.reason) {
    try {
      const stackFrame = ErrorStackParser.parse(e.reason)?.[0]
      if (stackFrame) {
        detail.filename = stackFrame.fileName
        detail.lineno = stackFrame.lineNumber
        detail.colno = stackFrame.columnNumber
      }
    }
    catch (_) {
    }
  }

  const { client } = getOhbugObject<Window>()
  const event = client.createEvent<UnhandledrejectionErrorDetail>({
    category: 'error',
    type: EventTypes.UNHANDLEDREJECTION_ERROR,
    detail,
  })
  client.notify(event)
}
