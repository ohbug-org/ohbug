import { types, WrappedIssue, createIssue } from '@ohbug/core'

const { AJAX_ERROR } = types

interface Detail {
  req: {
    data: string | {}
    method: string
    url: string
  }
  res: {
    response: string
    status: number
    statusText: string
  }
}

function ajaxErrorHandler(detail: Detail, collector: (WrappedIssue: WrappedIssue<Detail>) => void) {
  const WrappedIssue = createIssue<Detail>(AJAX_ERROR, detail)
  collector(WrappedIssue)
}

export default ajaxErrorHandler
