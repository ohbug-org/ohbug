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

export function createEvent<D>(
  { category, type, detail }: OhbugCreateEvent<D>,
  client: OhbugClient
): OhbugEvent<D> {
  category = category || 'error'

  const { apiKey, appVersion, appType } = client._config
  const timestamp = new Date().toISOString()
  const device = createDevice(client)

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
  return Boolean(eventLike._isOhbugEvent)
}
