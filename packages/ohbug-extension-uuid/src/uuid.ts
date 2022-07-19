import { v4 as uuidv4 } from 'uuid'
import { isBrowser, isNode } from '@ohbug/utils'
import { docCookies } from './cookie'

const key = 'OhbugUUID'

export function getUUID(): string {
  if (isBrowser()) {
    const UUID = docCookies.getItem(key)
    if (!UUID) {
      const extraTime = 60 * 30 * 24 * 3600 * 1000 // 30天后过期
      const endTime = new Date()
      endTime.setTime(endTime.getTime() + extraTime)
      const uuid = uuidv4()
      docCookies.setItem(key, uuid, endTime)
      return uuid
    }
    return UUID
  }
  if (isNode()) { return uuidv4() }

  return ''
}
