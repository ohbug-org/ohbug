import type { OhbugDevice, OhbugGetDevice } from '@ohbug/types'

export const device: OhbugGetDevice = () => {
  const ohbugDevice: OhbugDevice = {}
  if (navigator) {
    const {
      language,
      userAgent,
      // @ts-expect-error Chromium only
      connection,
    } = navigator
    ohbugDevice.language = language
    ohbugDevice.userAgent = userAgent
    if (connection) {
      // Chromium only
      ohbugDevice.connection = {
        downlink: connection.downlink,
        effectiveType: connection.effectiveType,
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
