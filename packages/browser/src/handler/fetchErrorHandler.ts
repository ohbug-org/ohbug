import { types, WrappedIssue, createIssue } from '@ohbug/core'

const { FETCH_ERROR } = types

interface Detail {
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
  detail: Detail,
  collector: (WrappedIssue: WrappedIssue<Detail>) => void
) {
  const WrappedIssue = createIssue<Detail>(FETCH_ERROR, detail)
  collector(WrappedIssue)
}

export default fetchErrorHandler
