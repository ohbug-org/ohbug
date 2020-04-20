import { OhbugTags } from '@ohbug/types'
import { getOhbugObject } from './config'

function getTags<T>(): OhbugTags {
  const { uuid, platform, version } = getOhbugObject<T>()
  const tags: OhbugTags = {
    uuid,
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

export default getTags
