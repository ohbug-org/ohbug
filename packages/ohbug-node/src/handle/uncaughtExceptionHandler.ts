import { EventTypes } from "@ohbug/core";
import type { OhbugBaseDetail } from "@ohbug/types";
import { getOhbugObject } from "@ohbug/utils";

export interface UncaughtExceptionDetail extends OhbugBaseDetail {
  name: string;
  stack?: string;
  origin?: string;
}

export async function uncaughtExceptionHandler(error: Error, origin: string) {
  const detail: UncaughtExceptionDetail = {
    name: error?.name ?? "Error",
    message: error?.message ?? String(error),
    stack: error?.stack,
    origin,
  };

  const { client } = getOhbugObject();
  const event = client.createEvent<UncaughtExceptionDetail>({
    category: "error",
    type: EventTypes.UNCAUGHT_ERROR,
    detail,
  });
  await client.notify(event);
}
