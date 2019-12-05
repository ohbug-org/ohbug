import { types, WrappedIssue, createIssue, BaseDetail } from '@ohbug/core'

const { AJAX_ERROR } = types

export interface AjaxErrorDetail extends BaseDetail {
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

function ajaxErrorHandler(
  detail: AjaxErrorDetail,
  collector: (WrappedIssue: WrappedIssue<AjaxErrorDetail>) => void
) {
  const WrappedIssue = createIssue<AjaxErrorDetail>(AJAX_ERROR, detail)
  collector(WrappedIssue)
}

export default ajaxErrorHandler
