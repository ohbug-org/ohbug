import { replace, getGlobal, parseUrl } from '@ohbug/utils'
import { getHub } from '@ohbug/core'

const global = getGlobal<Window>()

let lastHref: string | undefined

function handleUrlChange(from?: string, to?: string) {
  const hub = getHub<Window>()
  const _href = parseUrl(global.location.href)
  let _from = parseUrl(from as string)
  const _to = parseUrl(to as string)

  if (!_from.path) {
    _from = _href
  }

  lastHref = to

  if (_href.protocol === _to.protocol && _href.host === _to.host) {
    to = _to.relative
  }
  if (_href.protocol === _from.protocol && _href.host === _from.host) {
    from = _from.relative
  }
  if (from === to) return

  const timestamp = new Date().getTime()
  hub.addAction({
    type: 'navigation',
    timestamp,
    data: {
      from,
      to
    }
  })
}

function historyReplacement(original: () => void) {
  return function(data: any, title: string, url?: string) {
    if (url) {
      handleUrlChange(lastHref, String(url))
    }
    return original.apply(this, [data, title, url])
  }
}

let historyOriginal = {
  pushState: global.history.pushState,
  replaceState: global.history.replaceState,
  onpopstate: global.onpopstate
}
function historyListener() {
  historyOriginal.pushState = replace(global.history, 'pushState', historyReplacement)
  historyOriginal.replaceState = replace(global.history, 'replaceState', historyReplacement)
  historyOriginal.onpopstate = replace(global, 'onpopstate', () => {
    const current = global.location.href
    handleUrlChange(lastHref, current)
  })
}

function hashListener(e: HashChangeEvent) {
  const { oldURL, newURL } = e
  handleUrlChange(oldURL, newURL)
}

function captureUrlChange() {
  // history
  historyListener()
  // hash
  global.addEventListener('hashchange', hashListener, true)
}

export function removeCaptureUrlChange() {
  // history
  global.history.pushState = historyOriginal.pushState
  global.history.replaceState = historyOriginal.replaceState
  global.onpopstate = historyOriginal.onpopstate
  // hash
  global.removeEventListener('hashchange', hashListener, true)
}

export default captureUrlChange
