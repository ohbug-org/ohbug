import { types, WrappedIssue, createIssue } from '@ohbug/core'

const { UNHANDLEDREJECTION_ERROR } = types

interface Detail {
  message: string
  stack: string
}

function unhandledrejectionErrorHandler(
  error: PromiseRejectionEvent,
  collector: (wrappedIssue: WrappedIssue<Detail>) => void
) {
  const wrappedIssue = createIssue<Detail>(UNHANDLEDREJECTION_ERROR, {
    message: error.reason.message || error.reason,
    stack: error.reason.stack
  })
  collector(wrappedIssue)
}

export default unhandledrejectionErrorHandler
