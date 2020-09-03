import type { OhbugGetDevice, OhbugDevice } from '@ohbug/types'
import { version } from './version'

const platform = 'browser'

export const getDevice: OhbugGetDevice = () => {
  const device: OhbugDevice = {
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
