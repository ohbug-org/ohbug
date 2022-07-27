import type { OhbugDevice, OhbugGetDevice } from '@ohbug/types'

export const device: OhbugGetDevice = () => {
  const ohbugDevice: OhbugDevice = {}
  if (navigator) {
    const { language, userAgent, connection } = navigator
    ohbugDevice.language = language
    ohbugDevice.userAgent = userAgent
    ohbugDevice.connection = connection
  }
  if (document) {
    const { title, referrer } = document
    ohbugDevice.title = title
    ohbugDevice.referrer = referrer
  }
  if (window.location) {
    const { href: url } = window.location
    ohbugDevice.url = url
  }
  return ohbugDevice
}
