import { getGlobal } from '@ohbug/utils'

import { scriptDispatcher } from '../../dispatch'

const global = getGlobal<Window>()

function listener(e: PromiseRejectionEvent) {
  scriptDispatcher(e)
}

/**
 * capture UNHANDLEDREJECTION_ERROR
 */
export function captureUnhandledrejectionError() {
  global?.addEventListener?.('unhandledrejection', listener, true)
}

export function removeCaptureUnhandledrejectionError() {
  global?.removeEventListener?.('unhandledrejection', listener, true)
}
