import type { OhbugEvent, OhbugCreateEvent, OhbugClient } from '@ohbug/types'

import { createDevice } from './device'

export function createEvent<D>(
  { category, type, detail }: OhbugCreateEvent<D>,
  client: OhbugClient
): OhbugEvent<D> {
  category = category || 'error'

  const { apiKey, appVersion, appType } = client._config
  const timestamp = new Date().toISOString()
  const device = createDevice(client)

  const event: OhbugEvent<D> = {
    apiKey,
    timestamp,
    category,
    type,
    device,
    detail,
  }
  if (appVersion) {
    event.appVersion = appVersion
  }
  if (appType) {
    event.appType = appType
  }

  // view removes actions to reduce request size
  if (type !== 'view' && category !== 'view') {
    event.actions = client._actions
  }

  return event
}

export function createOtherEvent<D>(type: string, detail: D) {
  const category = 'other'
  return createEvent<D>({ type, detail, category }, null as any)
}
