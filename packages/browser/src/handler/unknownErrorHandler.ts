import { types, WrappedIssue, createIssue, BaseDetail } from '@ohbug/core'

const { UNKNOWN_ERROR } = types

export interface UnknownErrorDetail extends BaseDetail {}

function unknownErrorHandler(
  error: any,
  collector: (wrappedIssue: WrappedIssue<UnknownErrorDetail>) => void
) {
  const detail = error.message
    ? error
    : {
        message: error
      }
  const wrappedIssue = createIssue<UnknownErrorDetail>(UNKNOWN_ERROR, detail)
  collector(wrappedIssue)
}

export default unknownErrorHandler
