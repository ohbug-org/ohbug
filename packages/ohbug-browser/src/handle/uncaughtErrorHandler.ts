import { getOhbugObject } from '@ohbug/utils'
import type { OhbugBaseDetail } from '@ohbug/types'
import { EventTypes } from '@ohbug/core'

export interface UncaughtErrorDetail extends OhbugBaseDetail {
  name: string
  filename: string
  lineno: number
  colno: number
  stack: string
}

export function uncaughtErrorHandler(error: ErrorEvent) {
  const {
    message,
    filename,
    lineno,
    colno,
    error: { stack, name },
  } = error

  const detail: UncaughtErrorDetail = {
    name,
    message,
    filename,
    lineno,
    colno,
    stack,
  }
  const { client } = getOhbugObject<Window>()
  const event = client.createEvent<UncaughtErrorDetail>({
    category: 'error',
    type: EventTypes.UNCAUGHT_ERROR,
    detail,
  })
  client.notify(event)
}
