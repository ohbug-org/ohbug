import { getOhbugObject } from '@ohbug/utils'
import type { OhbugBaseDetail } from '@ohbug/types'
import { EventTypes } from '@ohbug/core'
import ErrorStackParser from 'error-stack-parser'

export interface UncaughtErrorDetail extends OhbugBaseDetail {
  name: string
  filename?: string
  lineno?: number
  colno?: number
  stack: string
}

export function uncaughtErrorHandler(e: ErrorEvent) {
  const [stackFrame] = ErrorStackParser.parse(e.error)

  const detail: UncaughtErrorDetail = {
    name: e?.error?.name,
    message: e?.message || e?.error?.message,
    filename: e?.filename || stackFrame?.fileName,
    lineno: e?.lineno || stackFrame?.lineNumber,
    colno: e?.colno || stackFrame?.columnNumber,
    stack: e?.error?.stack,
  }
  const { client } = getOhbugObject<Window>()
  const event = client.createEvent<UncaughtErrorDetail>({
    category: 'error',
    type: EventTypes.UNCAUGHT_ERROR,
    detail,
  })
  client.notify(event)
}
