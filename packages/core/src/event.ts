import type {
  OhbugEvent,
  OhbugCreateEvent,
  OhbugClient,
  OhbugUser,
  OhbugAction,
  OhbugCategory,
  OhbugDevice,
} from '@ohbug/types'

import { createDevice } from './device'
import { isObject } from '@ohbug/utils'

export class Event<D> implements OhbugEvent<D> {
  readonly apiKey: string
  readonly appVersion?: string
  readonly appType?: string
  readonly timestamp: string
  readonly category?: OhbugCategory
  readonly type: string
  readonly device: OhbugDevice
  readonly detail: D
  user?: OhbugUser
  readonly actions?: OhbugAction[]
  readonly metaData?: any

  constructor(values: OhbugEvent<D>) {
    const {
      apiKey,
      appVersion,
      appType,
      timestamp,
      category,
      type,
      device,
      detail,
      user,
      actions,
      metaData,
    } = values
    this.apiKey = apiKey
    this.appVersion = appVersion
    this.appType = appType
    this.timestamp = timestamp
    this.category = category
    this.type = type
    this.device = device
    this.detail = detail
    this.user = user
    this.actions = actions
    this.metaData = metaData
  }

  get _isOhbugEvent() {
    return true
  }
}

export function createEvent<D>(values: OhbugCreateEvent<D>, client: OhbugClient): OhbugEvent<D> {
  const { apiKey, appVersion, appType } = client._config
  const timestamp = new Date().toISOString()
  const device = createDevice(client)
  let category: OhbugCategory, type: string, detail: D
  if (
    isObject(values) &&
    Object.prototype.hasOwnProperty.call(values, 'type') &&
    Object.prototype.hasOwnProperty.call(values, 'detail')
  ) {
    category = values.category || 'error'
    type = values.type
    detail = values.detail
  } else {
    category = 'error'
    type = 'unknownError'
    detail = (values as unknown) as D
  }

  return new Event({
    apiKey,
    appVersion,
    appType,
    timestamp,
    category,
    type,
    device,
    user: client._user,
    detail,
    actions: client._actions,
    metaData: client._metaData,
  })
}

export function isEvent(eventLike: any): eventLike is OhbugEvent<any> {
  return Boolean(eventLike?._isOhbugEvent)
}
