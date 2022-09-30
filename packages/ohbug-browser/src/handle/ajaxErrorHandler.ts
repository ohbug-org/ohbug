import { getOhbugObject } from '@ohbug/utils'
import type { OhbugBaseDetail } from '@ohbug/types'
import { EventTypes } from '@ohbug/core'

export interface AjaxErrorDetail extends OhbugBaseDetail {
  req: {
    url: string
    method: string
    data?: string
    params?: string
  }
  res: {
    response: string
    status: number
    statusText?: string
  }
}

export function ajaxErrorHandler(detail: AjaxErrorDetail) {
  const { client } = getOhbugObject<Window>()
  const event = client.createEvent<AjaxErrorDetail>({
    category: 'error',
    type: EventTypes.AJAX_ERROR,
    detail,
  })
  client.notify(event)
}
