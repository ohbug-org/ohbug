import type { OhbugClient, OhbugEventWithMethods } from '@ohbug/types'
import { isFunction } from '@ohbug/utils'

function handleNotified<D>(
  event: OhbugEventWithMethods<D>,
  client: OhbugClient,
) {
  const funcs = [
    client.__config.onNotify,
    ...client.__extensions
      .filter(({ onNotify }) => isFunction(onNotify))
      .map(({ onNotify }) => onNotify),
  ]
  funcs.forEach(func => func?.(event, client))
}

/**
 * Used to control the timing of reporting events and the related life cycle.
 *
 * @param event
 * @param client
 */
export async function notify<D>(
  event: OhbugEventWithMethods<D> | null,
  client: OhbugClient,
): Promise<any> {
  try {
    let result = null
    if (event) {
      result = await client.__notifier(event)
      handleNotified(event, client)
    }
    return result
  }
  catch (e) {
    client.__logger.error(e)
  }
}
