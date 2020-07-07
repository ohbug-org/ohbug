import { getConfig } from './config'
import { getHub } from './hub'
import getDevice from './getDevice'
import type { OhbugEvent, OhbugAction, OhbugCategory } from '@ohbug/types'

function getActions<T>(): OhbugAction[] {
  const hub = getHub<T>()
  return hub.getActions()
}

function createEvent<D, T = Window>(
  type: string,
  detail: D,
  category?: OhbugCategory
): OhbugEvent<D> {
  category = category || 'error'

  const { apiKey, appVersion, appType } = getConfig<T>()
  const timestamp = new Date().toISOString()
  const device = getDevice<T>()

  const result: OhbugEvent<D> = {
    apiKey,
    timestamp,
    category,
    type,
    device,
    detail,
  }

  if (appVersion) {
    result.appVersion = appVersion
  }
  if (appType) {
    result.appType = appType
  }
  // view removes actions to reduce request size
  if (type !== 'view' && category !== 'view') {
    const actions = getActions<T>()
    result.actions = actions
  }

  return result
}

export function createOtherEvent<D, T = Window>(type: string, detail: D) {
  const category = 'other'
  return createEvent<D, T>(type, detail, category)
}

export default createEvent
