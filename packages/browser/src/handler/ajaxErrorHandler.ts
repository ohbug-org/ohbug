import { types, createEvent } from '@ohbug/core'
import { Event, BaseDetail } from '@ohbug/types'

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
  collector: (event: Event<AjaxErrorDetail>) => void
) {
  const event = createEvent<AjaxErrorDetail>(AJAX_ERROR, detail)
  collector(event)
}

export default ajaxErrorHandler
