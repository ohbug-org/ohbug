import { getOhbugObject } from "@ohbug/utils";

export function sendPageView(path: string, initial?: boolean) {
  const { client } = getOhbugObject<Window>();
  const event = client.createEvent({
    category: "view",
    type: "pageView",
    detail: {
      initial,
      path,
    },
  });
  void client.notify(event);
}

export function sendUserView(path: string) {
  const { client } = getOhbugObject<Window>();
  const event = client.createEvent({
    category: "view",
    type: "userView",
    detail: { path },
  });
  void client.notify(event);
}
