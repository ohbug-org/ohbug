import { OhbugClient, OhbugEvent, OhbugExtension } from '@ohbug/types'
import { compose, isFunction } from '@ohbug/utils'

export function createExtension(extension: OhbugExtension) {
  return extension
}

/**
 * Plugin loading and initialization
 *
 * @param extension
 * @param client
 */
export function loadExtension(extension: OhbugExtension, client: OhbugClient): OhbugClient {
  extension.init?.(client)
  client._extensions.push(extension)
  client._hooks.created = compose(
    // @ts-ignore
    client._config.created,
    ...client._extensions.filter(({ created }) => isFunction(created)).map(({ created }) => created)
  )
  client._hooks.notified = (_event: OhbugEvent<any>, _client: OhbugClient) =>
    [
      client._config.notified,
      ...client._extensions
        .filter(({ notified }) => isFunction(notified))
        .map(({ notified }) => notified),
    ].forEach((func) => func?.(_event, _client))

  return client
}
