import type { OhbugClient, OhbugEventWithMethods } from "@ohbug/types";
import { isFunction } from "@ohbug/utils";

function handleNotified<D>(event: OhbugEventWithMethods<D>, client: OhbugClient) {
  const funcs = [
    client.__config.onNotify,
    ...client.__extensions
      .filter(({ onNotify }) => isFunction(onNotify))
      .map(({ onNotify }) => onNotify),
  ];
  funcs.forEach((func) => func?.(event, client));
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
  if (!event) return null;

  let result = null;
  try {
    result = await client.__notifier(event);
  } catch (e) {
    client.__logger.error(e);
  }

  // Always run onNotify hooks, even if the built-in notifier failed.
  // This lets extensions (e.g. custom OTLP exporters) handle events independently.
  handleNotified(event, client);

  return result;
}
