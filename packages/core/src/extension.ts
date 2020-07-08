import { OhbugClient, OhbugExtension } from '@ohbug/types'

export function createExtension(extension: OhbugExtension) {
  return extension
}

/**
 * Plugin loading and initialization
 *
 * @param extension
 * @param client
 */
export function loadExtension(extension: OhbugExtension, client: OhbugClient) {
  client._extensions.push(extension)

  extension.init?.(client)
}
