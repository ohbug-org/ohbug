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

export function uncaughtErrorHandler(error: ErrorEvent) {
  const [stackFrame] = ErrorStackParser.parse(error.error)

  const detail: UncaughtErrorDetail = {
    name: error?.error?.name,
    message: error?.message || error?.error?.message,
    filename: error?.filename || stackFrame?.fileName,
    lineno: error?.lineno || stackFrame?.lineNumber,
    colno: error?.colno || stackFrame?.columnNumber,
    stack: error?.error?.stack,
  }
  const { client } = getOhbugObject<Window>()
  const event = client.createEvent<UncaughtErrorDetail>({
    category: 'error',
    type: EventTypes.UNCAUGHT_ERROR,
    detail,
  })
  client.notify(event)
}
