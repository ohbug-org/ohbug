import { getOhbugObject } from '@ohbug/utils'
import type { OhbugBaseDetail } from '@ohbug/types'
import { AJAX_ERROR } from '@ohbug/core'

export interface AjaxErrorDetail extends OhbugBaseDetail {
  req: {
    url: string
    method: string
    data: string | {}
  }
  res: {
    response: string
    status: number
    statusText: string
  }
}

export function ajaxErrorHandler(detail: AjaxErrorDetail) {
  const { client } = getOhbugObject<Window>()
  const event = client.createEvent<AjaxErrorDetail>({
    category: 'error',
    type: AJAX_ERROR,
    detail,
  })
  client.notify(event)
}
