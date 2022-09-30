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

export function unknownErrorHandler(e: any) {
  const detail: UnknownErrorDetail = {
    name: e?.error?.name,
    message: e?.message || e?.error?.message,
    filename: e?.filename,
    lineno: e?.lineno,
    colno: e?.colno,
    stack: e?.error?.stack,
  }
  if (e.error) {
    try {
      const stackFrame = ErrorStackParser.parse(e.error)?.[0]
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
  const event = client.createEvent<UnknownErrorDetail>({
    category: 'error',
    type: EventTypes.UNKNOWN_ERROR,
    detail,
  })
  client.notify(event)
}
