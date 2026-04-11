import type { OhbugEventWithMethods } from "@ohbug/types";
import { getCircularReplacer, getOhbugObject } from "@ohbug/utils";

export async function notifier<D>(event: OhbugEventWithMethods<D>) {
  const { client } = getOhbugObject();
  const url = client.__config.endpoint!;
  const json = JSON.stringify(event, getCircularReplacer());

  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json;charset=UTF-8" },
    body: json,
  });

  if (!response.ok) {
    client.__logger.warn(`@ohbug/node notifier: server responded with ${response.status}`);
  }

  return response;
}
