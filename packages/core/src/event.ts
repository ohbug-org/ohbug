import type { OhbugEvent, OhbugAction, OhbugCreateEvent, OhbugClient } from '@ohbug/types'

import { getHub } from './hub'
import { createDevice } from './device'

function getActions<T>(): OhbugAction[] {
  const hub = getHub<T>()
  return hub.getActions()
}

export function createEvent<D, T = Window>(
  { category, type, detail }: OhbugCreateEvent<D>,
  client: OhbugClient
): OhbugEvent<D> {
  category = category || 'error'

  const { apiKey, appVersion, appType } = client._config
  const timestamp = new Date().toISOString()
  const device = createDevice<T>()

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
    const actions = getActions<T>()
    event.actions = actions
  }

  return event
}

export function createOtherEvent<D, T = Window>(type: string, detail: D) {
  const category = 'other'
  return createEvent<D, T>({ type, detail, category }, null as any)
}
