import { getOhbugObject } from '@ohbug/utils'
import type { OhbugBaseDetail } from '@ohbug/types'
import { EventTypes } from '@ohbug/core'

export interface FetchErrorDetail extends OhbugBaseDetail {
  req: {
    url: string
    method: string
    data?: string
    params?: string
  }
  res: {
    status: number
    statusText?: string
  }
}

export function fetchErrorHandler(detail: FetchErrorDetail) {
  const { client } = getOhbugObject<Window>()
  const event = client.createEvent<FetchErrorDetail>({
    category: 'error',
    type: EventTypes.FETCH_ERROR,
    detail,
  })
  client.notify(event)
}
