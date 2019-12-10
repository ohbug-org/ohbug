import { types, Event, createEvent, BaseDetail } from '@ohbug/core'

const { UNCAUGHT_ERROR } = types

export interface UncaughtErrorDetail extends BaseDetail {
  name: string
  filename: string
  lineno: number
  colno: number
  stack: string
}

function uncaughtErrorHandler(
  error: ErrorEvent,
  collector: (event: Event<UncaughtErrorDetail>) => void
) {
  const {
    message,
    filename,
    lineno,
    colno,
    error: { stack, name }
  } = error

  const event = createEvent<UncaughtErrorDetail>(UNCAUGHT_ERROR, {
    name,
    message,
    filename,
    lineno,
    colno,
    stack
  })
  collector(event)
}

export default uncaughtErrorHandler
