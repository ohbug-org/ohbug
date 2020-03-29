import { collect } from '@ohbug/core'

import {
  uncaughtErrorHandler,
  resourceErrorHandler,
  unhandledrejectionErrorHandler,
  unknownErrorHandler
} from '../handle'

function scriptDispatcher(e: ErrorEvent | PromiseRejectionEvent) {
  try {
    const { type } = e
    if (type === 'error') {
      const _e = e as ErrorEvent
      const { message, error } = _e
      const immutableTarget = e.target || e.srcElement
      if (message && error) {
        uncaughtErrorHandler(_e, collect)
      } else if (immutableTarget) {
        resourceErrorHandler(_e, collect)
      }
    } else if (type === 'unhandledrejection') {
      unhandledrejectionErrorHandler(e as PromiseRejectionEvent, collect)
    } else {
      unknownErrorHandler(e, collect)
    }
  } catch (error) {
    unknownErrorHandler(error, collect)
  }
}

export default scriptDispatcher
