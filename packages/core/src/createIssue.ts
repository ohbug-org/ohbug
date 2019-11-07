import { getGlobal } from '@ohbug/utils'
import { getConfig } from './config'
import { WrappedIssue, Base } from './interface'
import { version } from './version'

const global = getGlobal()

function getBase(): Base {
  const { appid } = getConfig()
  const { platform } = global.__OHBUG__
  const time = new Date().getTime()
  const base: Base = {
    appid,
    platform,
    version,
    time
  }
  if (navigator) {
    const { language, userAgent } = navigator
    base.language = language
    base.userAgent = userAgent
  }
  if (document) {
    const { title } = document
    base.title = title
  }
  if (location) {
    const { href: url } = location
    base.url = url
  }
  return base
}

function createIssue<T>(type: string, detail: T): WrappedIssue<T> {
  const base = getBase()
  return {
    type,
    base,
    detail
  }
}

export default createIssue
