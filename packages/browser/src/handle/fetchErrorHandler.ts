import { types, createEvent } from '@ohbug/core'
import { Event, BaseDetail } from '@ohbug/types'

const { FETCH_ERROR } = types

export interface FetchErrorDetail extends BaseDetail {
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
  collect: (event: Event<FetchErrorDetail>) => void
) {
  const event = createEvent<FetchErrorDetail>(FETCH_ERROR, detail)
  collect(event)
}

export default fetchErrorHandler
