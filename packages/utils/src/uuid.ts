import { isBrowser, isNode } from './get'
import { docCookies } from './cookie'

const key = 'OhbugUUID'

export function getUUID(): string {
  if (isBrowser()) {
    const UUID = docCookies.getItem(key)
    if (!UUID) {
      const extraTime = 60 * 30 * 24 * 3600 * 1000 // 30天后过期
      const endTime = new Date()
      endTime.setTime(endTime.getTime() + extraTime)
      const { v4: uuidv4 } = require('uuid')
      const _uuid = uuidv4()
      docCookies.setItem(key, _uuid, endTime)
      return _uuid
    }
    return UUID
  } else if (isNode()) {
    const { machineIdSync } = require('node-machine-id')
    const UUID = machineIdSync(true)
    return UUID
  }
  return ''
}
