import { types, createEvent } from '@ohbug/core'
import type { OhbugEvent, OhbugBaseDetail } from '@ohbug/types'

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

function fetchErrorHandler(
  detail: FetchErrorDetail,
  collect: (event: OhbugEvent<FetchErrorDetail>) => void
) {
  const event = createEvent<FetchErrorDetail>(FETCH_ERROR, detail)
  collect(event)
}

export default fetchErrorHandler
