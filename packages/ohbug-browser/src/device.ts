import type { OhbugDevice, OhbugGetDevice } from '@ohbug/types'

export const device: OhbugGetDevice = () => {
  const ohbugDevice: OhbugDevice = {}
  if (navigator) {
    const { language, userAgent, connection } = navigator
    ohbugDevice.language = language
    ohbugDevice.userAgent = userAgent
    if (connection) {
      // Chromium only
      ohbugDevice.connection = {
        // @ts-expect-error Chromium only
        downlink: connection.downlink,
        // @ts-expect-error Chromium only
        effectiveType: connection.effectiveType,
        // @ts-expect-error Chromium only
        rtt: connection.rtt,
      }
    }
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
