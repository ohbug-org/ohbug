import type { OhbugClient, OhbugEvent } from '@ohbug/types'
import { isFunction } from '@ohbug/utils'

/**
 * Used to control the timing of reporting events and the related life cycle.
 *
 * @param event
 * @param client
 */
export async function notify<D>(event: OhbugEvent<D> | false, client: OhbugClient): Promise<any> {
  try {
    let result = null
    if (event) {
      result = await client._notifier(event)
    }
    if (isFunction(client._hooks.notified)) {
      client._hooks.notified(result, client)
    }
  } catch (e) {
    client._logger.error(e)
  }
}
