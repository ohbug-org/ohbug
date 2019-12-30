import { getConfig, getOhbugObject } from './config'
import { Event, Tags, Breadcrumb } from './interface'
import { version } from './version'
import { getHub } from './hub'

function getTags<T>(): Tags {
  const { platform } = getOhbugObject<T>()
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

function createEvent<D, T = Window>(type: string, detail: D): Event<D> {
  const { appid } = getConfig<T>()
  const tags = getTags<T>()
  const timestamp = new Date().getTime()
  const breadcrumbs = getBreadcrumbs<T>()

  return {
    appid,
    timestamp,
    type,
    tags,
    breadcrumbs,
    detail
  }
}

export default createEvent
