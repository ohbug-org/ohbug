import {
  uncaughtErrorHandler,
  resourceErrorHandler,
  unhandledrejectionErrorHandler,
  unknownErrorHandler,
} from '../handle'

export function scriptDispatcher(e: ErrorEvent | PromiseRejectionEvent) {
  try {
    const { type } = e
    if (type === 'error') {
      const _e = e as ErrorEvent
      const { message, error } = _e
      const immutableTarget = e.target || e.srcElement
      if (message && error) {
        uncaughtErrorHandler(_e)
      } else if (immutableTarget) {
        resourceErrorHandler(_e)
      }
    } else if (type === 'unhandledrejection') {
      unhandledrejectionErrorHandler(e as PromiseRejectionEvent)
    } else {
      unknownErrorHandler(e)
    }
  } catch (error) {
    unknownErrorHandler(error)
  }
}
