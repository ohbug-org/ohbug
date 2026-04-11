import { EventTypes } from "@ohbug/core";
import type { OhbugBaseDetail } from "@ohbug/types";
import { getOhbugObject } from "@ohbug/utils";

export interface UnknownErrorDetail extends OhbugBaseDetail {
  name?: string;
  stack?: string;
}

export function unknownErrorHandler(error: unknown) {
  const detail: UnknownErrorDetail = {
    name: error instanceof Error ? error.name : "UnknownError",
    message: error instanceof Error ? error.message : String(error),
    stack: error instanceof Error ? error.stack : undefined,
  };

  const { client } = getOhbugObject();
  const event = client.createEvent<UnknownErrorDetail>({
    category: "error",
    type: EventTypes.UNKNOWN_ERROR,
    detail,
  });
  client.notify(event).catch(() => {});
}
