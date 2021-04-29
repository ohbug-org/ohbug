import type { OhbugGetDevice, OhbugDevice } from '@ohbug/types'

export const getDevice: OhbugGetDevice = () => {
  const device: OhbugDevice = {}
  if (navigator) {
    const { language, userAgent } = navigator
    device.language = language
    device.userAgent = userAgent
  }
  if (document) {
    const { title } = document
    device.title = title
  }
  if (window.location) {
    const { href: url } = window.location
    device.url = url
  }
  return device
}
