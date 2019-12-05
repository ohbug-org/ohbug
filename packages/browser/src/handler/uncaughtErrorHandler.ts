import { types, WrappedIssue, createIssue, BaseDetail } from '@ohbug/core'

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
  collector: (wrappedIssue: WrappedIssue<UncaughtErrorDetail>) => void
) {
  const {
    message,
    filename,
    lineno,
    colno,
    error: { stack, name }
  } = error

  const wrappedIssue = createIssue<UncaughtErrorDetail>(UNCAUGHT_ERROR, {
    name,
    message,
    filename,
    lineno,
    colno,
    stack
  })
  collector(wrappedIssue)
}

export default uncaughtErrorHandler
