import type { OhbugDevice, OhbugGetDevice } from '@ohbug/types'

export const device: OhbugGetDevice = () => {
  const ohbugDevice: OhbugDevice = {}
  if (navigator) {
    const { language, userAgent } = navigator
    ohbugDevice.language = language
    ohbugDevice.userAgent = userAgent
  }
  if (document) {
    const { title } = document
    ohbugDevice.title = title
  }
  if (window.location) {
    const { href: url } = window.location
    ohbugDevice.url = url
  }
  return ohbugDevice
}
