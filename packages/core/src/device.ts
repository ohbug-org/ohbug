import type { OhbugDevice } from '@ohbug/types'
import { getOhbugObject } from './config'

export function createDevice<T>(): OhbugDevice {
  const { uuid, platform, version } = getOhbugObject<T>()
  const device: OhbugDevice = {
    uuid,
    platform,
    version,
  }
  if (navigator) {
    const { language, userAgent } = navigator
    device.language = language
    device.userAgent = userAgent
  }
  if (document) {
    const { title } = document
    device.title = title
  }
  if (location) {
    const { href: url } = location
    device.url = url
  }
  return device
}
