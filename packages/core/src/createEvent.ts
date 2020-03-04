import { Event, Tags, Breadcrumb, Category } from '@ohbug/types'
import { getConfig, getOhbugObject } from './config'
import { getHub } from './hub'

function getTags<T>(): Tags {
  const { platform, version } = getOhbugObject<T>()
  const tags: Tags = {
    platform,
    version
  }
  if (navigator) {
    const { language, userAgent } = navigator
    tags.language = language
    tags.userAgent = userAgent
  }
  if (document) {
    const { title } = document
    tags.title = title
  }
  if (location) {
    const { href: url } = location
    tags.url = url
  }
  return tags
}

function getBreadcrumbs<T>(): Breadcrumb[] {
  const hub = getHub<T>()
  return hub.getBreadcrumbs()
}

function createEvent<D, T = Window>(type: string, detail: D, category?: Category): Event<D> {
  category = category || 'error'

  const { apiKey, appVersion, appType } = getConfig<T>()
  const timestamp = new Date().getTime()
  const tags = getTags<T>()
  const breadcrumbs = getBreadcrumbs<T>()

  return {
    apiKey,
    appVersion,
    appType,
    timestamp,
    category,
    type,
    tags,
    breadcrumbs,
    detail
  }
}

export function createOtherEvent<D, T = Window>(type: string, detail: D) {
  const category = 'other'
  return createEvent<D, T>(type, detail, category)
}

export default createEvent
