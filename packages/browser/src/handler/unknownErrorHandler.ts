import { types, WrappedIssue, createIssue } from '@ohbug/core'

const { UNKNOWN_ERROR } = types

function unknownErrorHandler(error: any, collector: (wrappedIssue: WrappedIssue<any>) => void) {
  const wrappedIssue = createIssue<any>(UNKNOWN_ERROR, error)
  collector(wrappedIssue)
}

export default unknownErrorHandler
