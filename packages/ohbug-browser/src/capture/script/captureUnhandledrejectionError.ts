import { getGlobal } from '@ohbug/utils'

import { scriptDispatcher } from '../../dispatch'

const _global = getGlobal<Window>()

function listener(e: PromiseRejectionEvent) {
  scriptDispatcher(e)
}

/**
 * capture UNHANDLEDREJECTION_ERROR
 */
export function captureUnhandledrejectionError() {
  _global?.addEventListener?.('unhandledrejection', listener, true)
}

export function removeCaptureUnhandledrejectionError() {
  _global?.removeEventListener?.('unhandledrejection', listener, true)
}
