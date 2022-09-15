import { getOhbugObject } from '@ohbug/utils'
import type { OhbugBaseDetail } from '@ohbug/types'
import { EventTypes } from '@ohbug/core'
import ErrorStackParser from 'error-stack-parser'

export interface UnknownErrorDetail extends OhbugBaseDetail {
  name: string
  filename?: string
  lineno?: number
  colno?: number
  stack: string
}

export function unknownErrorHandler(e: ErrorEvent) {
  const [stackFrame] = ErrorStackParser.parse(e.error)

  const detail: UnknownErrorDetail = {
    name: e?.error?.name,
    message: e?.message || e?.error?.message,
    filename: e?.filename || stackFrame?.fileName,
    lineno: e?.lineno || stackFrame?.lineNumber,
    colno: e?.colno || stackFrame?.columnNumber,
    stack: e?.error?.stack,
  }
  const { client } = getOhbugObject<Window>()
  const event = client.createEvent<UnknownErrorDetail>({
    category: 'error',
    type: EventTypes.UNKNOWN_ERROR,
    detail,
  })
  client.notify(event)
}
