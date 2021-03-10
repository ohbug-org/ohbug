import { getGlobal } from '@ohbug/utils'

import { scriptDispatcher } from '../../dispatch'

const _global = getGlobal<Window>()

function listener(e: ErrorEvent) {
  scriptDispatcher(e)
}

/**
 * capture UNCAUGHT_ERROR RESOURCE_ERROR
 */
export function captureUncaughtError() {
  _global?.addEventListener?.('error', listener, true)
}

export function removeCaptureUncaughtError() {
  _global?.removeEventListener?.('error', listener, true)
}
