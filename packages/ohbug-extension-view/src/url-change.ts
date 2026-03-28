import { getGlobal, parseUrl, replace } from "@ohbug/utils";

import { sendPageView } from "./create-event";

const global = getGlobal<Window>();
let lastHref: string | undefined;

function handleUrlChange(from?: string, to?: string) {
  const parsedHref = parseUrl(global?.location?.href);
  let parsedFrom = parseUrl(from as string);
  const parsedTo = parseUrl(to as string);

  if (!parsedFrom.path) {
    parsedFrom = parsedHref;
  }

  lastHref = to;

  let targetFrom = from;
  let targetTo = to;

  if (parsedHref.protocol === parsedTo.protocol && parsedHref.host === parsedTo.host) {
    targetTo = parsedTo.relative;
  }
  if (parsedHref.protocol === parsedFrom.protocol && parsedHref.host === parsedFrom.host) {
    targetFrom = parsedFrom.relative;
  }
  if (targetFrom === targetTo) return;

  sendPageView(targetTo!);
}

function historyReplacement(original: (data: any, title: string, url?: string) => void) {
  return function call(this: History, data: any, title: string, url?: string) {
    if (url) {
      handleUrlChange(lastHref, String(url));
    }
    return Reflect.apply(original, this, [data, title, url]);
  };
}

const historyOriginal = {
  pushState: global?.history?.pushState?.bind(global.history),
  replaceState: global?.history?.replaceState?.bind(global.history),
  onpopstate: global?.onpopstate,
};
function historyListener() {
  historyOriginal.pushState = replace(global?.history, "pushState", historyReplacement);
  historyOriginal.replaceState = replace(global?.history, "replaceState", historyReplacement);
  // eslint-disable-next-line unicorn/prefer-add-event-listener
  historyOriginal.onpopstate = replace(global, "onpopstate", () => {
    const current = global?.location?.href;
    handleUrlChange(lastHref, current);
  });
}

function hashListener(e: HashChangeEvent) {
  const { oldURL, newURL } = e;
  handleUrlChange(oldURL, newURL);
}

/**
 * 如果 URL 发生变化 发送新的 Page View 统计
 */
function captureUrlChange() {
  // history
  historyListener();
  // hash
  global?.addEventListener?.("hashchange", hashListener, true);
}

export function removeCaptureUrlChange() {
  // history
  global.history.pushState = historyOriginal.pushState;
  global.history.replaceState = historyOriginal.replaceState;
  // eslint-disable-next-line unicorn/prefer-add-event-listener
  global.onpopstate = historyOriginal.onpopstate;
  // hash
  global?.removeEventListener?.("hashchange", hashListener, true);
}

export default captureUrlChange;
