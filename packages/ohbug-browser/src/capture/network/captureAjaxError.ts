import { EventTypes } from "@ohbug/core";
import { getGlobal, getOhbugObject, replace } from "@ohbug/utils";

import { networkDispatcher } from "../../dispatch";
import type { AjaxErrorDetail } from "../../handle";
import { getParams } from "./getParams";

const global = getGlobal<Window>();
const access = "XMLHttpRequest" in global;
const xhrOriginal = access
  ? {
      open: XMLHttpRequest.prototype.open.bind(XMLHttpRequest.prototype),
      send: XMLHttpRequest.prototype.send.bind(XMLHttpRequest.prototype),
    }
  : {};

/**
 * capture AJAX_ERROR
 */
export function captureAjaxError() {
  if (!access) return;

  const { client } = getOhbugObject<Window>();

  const desc = {
    method: "",
    url: "",
  };

  const xhrProto = XMLHttpRequest?.prototype;

  xhrOriginal.open = replace(
    xhrProto,
    "open",
    (origin) =>
      function call(this: any, ...args: any[]) {
        const [method, url] = args;
        desc.method = method;
        desc.url = url;
        return origin.apply(this, args);
      },
  );

  xhrOriginal.send = replace(
    xhrProto,
    "send",
    (origin) =>
      function call(this: any, ...args: any[]) {
        this.addEventListener("readystatechange", function handle(this: any) {
          if (this.readyState === 4) {
            if (desc.url !== client.__config.endpoint) {
              const { url, params } = getParams(desc.url);
              const detail: AjaxErrorDetail = {
                req: {
                  url,
                  method: desc.method,
                  data: args[0],
                  params,
                },
                res: {
                  status: this.status,
                  statusText: this.statusText,
                  response: this.response,
                },
              };

              client.addAction("ajax", detail, "ajax");
              if (!this.status || this.status >= 400) {
                networkDispatcher(EventTypes.AJAX_ERROR, detail);
              }
            }
          }
        });
        return origin.apply(this, args);
      },
  );
}

export function removeCaptureAjaxError() {
  if (access && xhrOriginal.open && xhrOriginal.send) {
    const xhrProto = XMLHttpRequest?.prototype;
    xhrProto.open = xhrOriginal.open;
    xhrProto.send = xhrOriginal.send;
  }
}
