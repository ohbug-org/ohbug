import { collector } from '@ohbug/core'

import {
  uncaughtErrorHandler,
  resourceErrorHandler,
  unhandledrejectionErrorHandler,
  unknownErrorHandler
} from '../handler'

function scriptDispatcher(e: ErrorEvent | PromiseRejectionEvent) {
  try {
    const { type } = e
    if (type === 'error') {
      const _e = e as ErrorEvent
      const { message, error } = _e
      const immutableTarget = e.target || e.srcElement
      if (message && error) {
        uncaughtErrorHandler(_e, collector)
      } else if (immutableTarget) {
        resourceErrorHandler(_e, collector)
      }
    } else if (type === 'unhandledrejection') {
      unhandledrejectionErrorHandler(e as PromiseRejectionEvent, collector)
    } else {
      unknownErrorHandler(e, collector)
    }
  } catch (error) {
    unknownErrorHandler(error, collector)
  }
}

export default scriptDispatcher
