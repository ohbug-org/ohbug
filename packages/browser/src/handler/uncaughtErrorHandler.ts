import { types, WrappedIssue, createIssue } from '@ohbug/core'

const { UNCAUGHT_ERROR } = types

interface Detail {
  name: string
  message: string
  filename: string
  lineno: number
  colno: number
  stack: string
}

function uncaughtErrorHandler(
  error: ErrorEvent,
  collector: (wrappedIssue: WrappedIssue<Detail>) => void
) {
  const {
    message,
    filename,
    lineno,
    colno,
    error: { stack, name }
  } = error

  const wrappedIssue = createIssue<Detail>(UNCAUGHT_ERROR, {
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
