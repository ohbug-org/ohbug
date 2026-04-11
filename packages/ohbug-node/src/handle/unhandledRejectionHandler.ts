import { EventTypes } from "@ohbug/core";
import type { OhbugBaseDetail } from "@ohbug/types";
import { getOhbugObject } from "@ohbug/utils";

export interface UnhandledRejectionDetail extends OhbugBaseDetail {
  name?: string;
  stack?: string;
}

export function unhandledRejectionHandler(reason: unknown, _promise: Promise<unknown>) {
  const detail: UnhandledRejectionDetail = {
    name: reason instanceof Error ? reason.name : "UnhandledRejection",
    message: reason instanceof Error ? reason.message : String(reason),
    stack: reason instanceof Error ? reason.stack : undefined,
  };

  const { client } = getOhbugObject();
  const event = client.createEvent<UnhandledRejectionDetail>({
    category: "error",
    type: EventTypes.UNHANDLEDREJECTION_ERROR,
    detail,
  });
  client.notify(event).catch(() => {});
}
