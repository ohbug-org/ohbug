import { types, createEvent } from '@ohbug/core'
import { OhbugEvent, OhbugBaseDetail } from '@ohbug/types'

const { AJAX_ERROR } = types

export interface AjaxErrorDetail extends OhbugBaseDetail {
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
  collect: (event: OhbugEvent<AjaxErrorDetail>) => void
) {
  const event = createEvent<AjaxErrorDetail>(AJAX_ERROR, detail)
  collect(event)
}

export default ajaxErrorHandler
