import { Event, Action, Category } from '@ohbug/types'
import { getConfig } from './config'
import { getHub } from './hub'
import getTags from './getTags'

function getActions<T>(): Action[] {
  const hub = getHub<T>()
  return hub.getActions()
}

function createEvent<D, T = Window>(type: string, detail: D, category?: Category): Event<D> {
  category = category || 'error'

  const { apiKey, appVersion, appType } = getConfig<T>()
  const timestamp = new Date().getTime()
  const tags = getTags<T>()
  const actions = getActions<T>()

  return {
    apiKey,
    appVersion,
    appType,
    timestamp,
    category,
    type,
    tags,
    actions,
    detail
  }
}

export function createOtherEvent<D, T = Window>(type: string, detail: D) {
  const category = 'other'
  return createEvent<D, T>(type, detail, category)
}

export default createEvent
