import { types, Event, createEvent, BaseDetail } from '@ohbug/core'

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
  collector: (event: Event<FetchErrorDetail>) => void
) {
  const event = createEvent<FetchErrorDetail>(FETCH_ERROR, detail)
  collector(event)
}

export default fetchErrorHandler
