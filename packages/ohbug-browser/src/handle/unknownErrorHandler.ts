import { getOhbugObject } from '@ohbug/utils'
import type { OhbugBaseDetail } from '@ohbug/types'

import * as types from '../types'

const { UNKNOWN_ERROR } = types

export interface UnknownErrorDetail extends OhbugBaseDetail {}

export function unknownErrorHandler(error: any) {
  const detail: UnknownErrorDetail = error.message
    ? error
    : {
        message: error,
      }
  const { client } = getOhbugObject<Window>()
  const event = client.createEvent<UnknownErrorDetail>({
    category: 'error',
    type: UNKNOWN_ERROR,
    detail,
  })
  client.notify(event)
}
