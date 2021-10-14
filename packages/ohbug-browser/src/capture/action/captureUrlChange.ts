import { replace, getGlobal, getOhbugObject, parseUrl } from '@ohbug/utils'

const global = getGlobal<Window>()
let lastHref: string | undefined

function handleUrlChange(from?: string, to?: string) {
  const { client } = getOhbugObject<Window>()
  const parsedHref = parseUrl(global?.location?.href)
  let parsedFrom = parseUrl(from as string)
  const parsedTo = parseUrl(to as string)

  if (!parsedFrom.path) {
    parsedFrom = parsedHref
  }

  lastHref = to

  let targetFrom = from
  let targetTo = to

  if (
    parsedHref.protocol === parsedTo.protocol &&
    parsedHref.host === parsedTo.host
  ) {
    targetTo = parsedTo.relative
  }
  if (
    parsedHref.protocol === parsedFrom.protocol &&
    parsedHref.host === parsedFrom.host
  ) {
    targetFrom = parsedFrom.relative
  }
  if (targetFrom === targetTo) return

  client.addAction(
    `navigation to ${to}`,
    {
      from,
      to,
    },
    'navigation'
  )
}

function historyReplacement(
  original: (data: any, title: string, url?: string) => void
) {
  return function call(data: any, title: string, url?: string) {
    if (url) {
      handleUrlChange(lastHref, String(url))
    }
    return original.apply(this, [data, title, url])
  }
}

const historyOriginal = {
  pushState: global?.history?.pushState,
  replaceState: global?.history?.replaceState,
  onpopstate: global?.onpopstate,
}
function historyListener() {
  historyOriginal.pushState = replace(
    global?.history,
    'pushState',
    historyReplacement
  )
  historyOriginal.replaceState = replace(
    global?.history,
    'replaceState',
    historyReplacement
  )
  historyOriginal.onpopstate = replace(
    global,
    'onpopstate',
    (origin) =>
      function call(...args: any[]) {
        const current = global?.location?.href
        handleUrlChange(lastHref, current)
        return origin?.apply(this, args)
      }
  )
}

function hashListener(e: Event) {
  const { oldURL, newURL } = e as HashChangeEvent
  handleUrlChange(oldURL, newURL)
}

export function captureUrlChange() {
  // history
  historyListener()
  // hash
  global?.addEventListener?.('hashchange', hashListener, true)
}

export function removeCaptureUrlChange() {
  // history
  global.history.pushState = historyOriginal.pushState
  global.history.replaceState = historyOriginal.replaceState
  global.onpopstate = historyOriginal.onpopstate
  // hash
  global?.removeEventListener?.('hashchange', hashListener, true)
}
