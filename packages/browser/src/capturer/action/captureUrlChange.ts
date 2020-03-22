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

function captureUrlChange() {
  // history
  replace(global.history, 'pushState', historyReplacement)
  replace(global.history, 'replaceState', historyReplacement)
  replace(global, 'onpopstate', () => {
    const current = global.location.href
    handleUrlChange(lastHref, current)
  })

  // hash
  global.addEventListener(
    'hashchange',
    e => {
      const { oldURL, newURL } = e
      handleUrlChange(oldURL, newURL)
    },
    true
  )
}

export default captureUrlChange
