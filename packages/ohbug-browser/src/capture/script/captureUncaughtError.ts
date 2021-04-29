import { getGlobal } from '@ohbug/utils'

import { scriptDispatcher } from '../../dispatch'

const global = getGlobal<Window>()

function listener(e: ErrorEvent) {
  scriptDispatcher(e)
}

/**
 * capture UNCAUGHT_ERROR RESOURCE_ERROR
 */
export function captureUncaughtError() {
  global?.addEventListener?.('error', listener, true)
}

export function removeCaptureUncaughtError() {
  global?.removeEventListener?.('error', listener, true)
}
