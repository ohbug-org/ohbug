import { types, WrappedIssue, createIssue, BaseDetail } from '@ohbug/core'

const { FETCH_ERROR } = types

export interface FetchErrorDetail extends BaseDetail {
  req: {
    url: string
    method: string
    data: string
  }
  res: {
    status: number
    statusText: string
  }
}

function fetchErrorHandler(
  detail: FetchErrorDetail,
  collector: (WrappedIssue: WrappedIssue<FetchErrorDetail>) => void
) {
  const WrappedIssue = createIssue<FetchErrorDetail>(FETCH_ERROR, detail)
  collector(WrappedIssue)
}

export default fetchErrorHandler
