import type { OhbugEvent, OhbugCreateEvent, OhbugClient, OhbugUser } from '@ohbug/types'

import { createDevice } from './device'
import { OhbugAction, OhbugCategory, OhbugDevice } from '@ohbug/types'

export class Event<D> implements OhbugEvent<D> {
  readonly apiKey: string
  readonly appVersion?: string
  readonly appType?: string
  readonly timestamp: string
  readonly category?: OhbugCategory
  readonly type: string
  readonly device: OhbugDevice
  readonly detail: D
  readonly user?: OhbugUser
  readonly actions?: OhbugAction[]
  readonly metadata?: any

  protected readonly _client: OhbugClient

  constructor(values: OhbugEvent<D>, client: OhbugClient) {
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
      metadata,
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
    this.metadata = metadata

    this._client = client
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

  const { apiKey, appVersion, appType, user } = client._config
  const timestamp = new Date().toISOString()
  const device = createDevice(client)

  return new Event(
    {
      apiKey,
      appVersion,
      appType,
      timestamp,
      category,
      type,
      device,
      user,
      detail,
      actions: client._actions,
    },
    client
  )
}

export function createOtherEvent<D>(type: string, detail: D) {
  const category = 'other'
  return createEvent<D>({ type, detail, category }, null as any)
}

export function isEvent(eventLike: any): eventLike is OhbugEvent<any> {
  return Boolean(eventLike._isOhbugEvent)
}
