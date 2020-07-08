import type { OhbugClient, OhbugDevice } from '@ohbug/types'

export function createDevice(client: OhbugClient): OhbugDevice {
  const { uuid, platform, version } = client._device

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
