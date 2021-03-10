import { replace, getGlobal, getOhbugObject, parseUrl } from '@ohbug/utils'

const _global = getGlobal<Window>()
let lastHref: string | undefined

function handleUrlChange(from?: string, to?: string) {
  const { client } = getOhbugObject<Window>()
  const _href = parseUrl(_global?.location?.href)
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
  return function (data: any, title: string, url?: string) {
    if (url) {
      handleUrlChange(lastHref, String(url))
    }
    // @ts-ignore
    return original.apply(this, [data, title, url])
  }
}

const historyOriginal = {
  pushState: _global?.history?.pushState,
  replaceState: _global?.history?.replaceState,
  onpopstate: _global?.onpopstate,
}
function historyListener() {
  historyOriginal.pushState = replace(
    _global?.history,
    'pushState',
    historyReplacement
  )
  historyOriginal.replaceState = replace(
    _global?.history,
    'replaceState',
    historyReplacement
  )
  historyOriginal.onpopstate = replace(_global, 'onpopstate', () => {
    const current = _global?.location?.href
    handleUrlChange(lastHref, current)
  })
}

function hashListener(e: HashChangeEvent) {
  const { oldURL, newURL } = e
  handleUrlChange(oldURL, newURL)
}

export function captureUrlChange() {
  // history
  historyListener()
  // hash
  _global?.addEventListener?.('hashchange', hashListener, true)
}

export function removeCaptureUrlChange() {
  // history
  _global.history.pushState = historyOriginal.pushState
  _global.history.replaceState = historyOriginal.replaceState
  _global.onpopstate = historyOriginal.onpopstate
  // hash
  _global?.removeEventListener?.('hashchange', hashListener, true)
}
