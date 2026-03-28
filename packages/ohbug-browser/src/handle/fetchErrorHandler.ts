import { EventTypes } from "@ohbug/core";
import type { OhbugBaseDetail } from "@ohbug/types";
import { getOhbugObject } from "@ohbug/utils";

export interface FetchErrorDetail extends OhbugBaseDetail {
  req: {
    url: string;
    method: string;
    data?: string;
    params?: string;
  };
  res: {
    status: number;
    statusText?: string;
  };
}

export function fetchErrorHandler(detail: FetchErrorDetail) {
  const { client } = getOhbugObject<Window>();
  const event = client.createEvent<FetchErrorDetail>({
    category: "error",
    type: EventTypes.FETCH_ERROR,
    detail,
  });
  void client.notify(event);
}
