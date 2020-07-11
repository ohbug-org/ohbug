import { getOhbugObject } from '@ohbug/utils'
import type { OhbugBaseDetail } from '@ohbug/types'

import * as types from '../types'
const { FETCH_ERROR } = types

export interface FetchErrorDetail extends OhbugBaseDetail {
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

export function fetchErrorHandler(detail: FetchErrorDetail) {
  const { client } = getOhbugObject<Window>()
  const event = client.createEvent<FetchErrorDetail>({
    category: 'error',
    type: FETCH_ERROR,
    detail,
  })
  client.notify(event)
}
