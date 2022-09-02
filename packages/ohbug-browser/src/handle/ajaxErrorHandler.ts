import { getOhbugObject } from '@ohbug/utils'
import type { OhbugBaseDetail } from '@ohbug/types'
import { EventTypes } from '@ohbug/core'

export interface AjaxErrorDetail extends OhbugBaseDetail {
  req: {
    url: string
    method: string
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
