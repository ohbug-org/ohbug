import { types, WrappedIssue, createIssue } from '@ohbug/core'

const { UNHANDLEDREJECTION_ERROR } = types

export interface UnhandledrejectionErrorDetail {
  message: string
  stack: string
}

function unhandledrejectionErrorHandler(
  error: PromiseRejectionEvent,
  collector: (wrappedIssue: WrappedIssue<UnhandledrejectionErrorDetail>) => void
) {
  const wrappedIssue = createIssue<UnhandledrejectionErrorDetail>(UNHANDLEDREJECTION_ERROR, {
    message: error.reason.message || error.reason,
    stack: error.reason.stack
  })
  collector(wrappedIssue)
}

export default unhandledrejectionErrorHandler
