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
  const [stackFrame] = ErrorStackParser.parse(e.reason)

  const detail: UnhandledrejectionErrorDetail = {
    name: e?.reason?.name,
    message: e?.reason?.message || e?.reason,
    filename: stackFrame?.fileName,
    lineno: stackFrame?.lineNumber,
    colno: stackFrame?.columnNumber,
    stack: e?.reason?.stack,
  }
  const { client } = getOhbugObject<Window>()
  const event = client.createEvent<UnhandledrejectionErrorDetail>({
    category: 'error',
    type: EventTypes.UNHANDLEDREJECTION_ERROR,
    detail,
  })
  client.notify(event)
}
