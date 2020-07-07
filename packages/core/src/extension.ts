import { OhbugClient, OhbugExtension } from '@ohbug/types'

export function createExtension(extension: OhbugExtension) {
  return extension
}

export function loadExtension(extension: OhbugExtension, client: OhbugClient) {
  return extension.apply(client)
}
