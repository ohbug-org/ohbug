import {
  OhbugClient,
  OhbugEventWithMethods,
  OhbugExtension,
  OhbugExtensionUI,
} from '@ohbug/types'
import { isFunction } from '@ohbug/utils'

export function createExtension(extension: OhbugExtension) {
  return extension
}
export function createExtensionUI(extensionUI: OhbugExtensionUI) {
  return extensionUI
}

/**
 * Extension loading and initialization
 *
 * @param extension
 * @param client
 * @param args
 */
export function loadExtension(
  extension: OhbugExtension,
  client: OhbugClient,
  ...args: any[]
): OhbugClient | any {
  const result = extension.init?.(client, ...args)
  client._extensions.push(extension)
  // @ts-ignore
  // eslint-disable-next-line no-param-reassign
  client._hooks.created = (
    _event: OhbugEventWithMethods<any>,
    _client: OhbugClient
  ) => {
    const funcs = [
      _client._config.created,
      ..._client._extensions
        .filter(({ created }) => isFunction(created))
        .map(({ created }) => created),
    ]
    if (funcs.length === 0) return ((...arg) => arg)(_event, _client)
    if (funcs.length === 1) return funcs[0]?.(_event, _client)
    // @ts-ignore
    return funcs.reduce((a, b) => (event) => b(a(event, _client), _client))?.(
      _event,
      _client
    )
  }
  // eslint-disable-next-line no-param-reassign
  client._hooks.notified = (
    _event: OhbugEventWithMethods<any>,
    _client: OhbugClient
  ) =>
    [
      _client._config.notified,
      ..._client._extensions
        .filter(({ notified }) => isFunction(notified))
        .map(({ notified }) => notified),
    ].forEach((func) => func?.(_event, _client))

  return result || client
}
