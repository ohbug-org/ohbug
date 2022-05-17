import {
  resourceErrorHandler,
  uncaughtErrorHandler,
  unhandledrejectionErrorHandler,
  unknownErrorHandler,
} from '../handle'

export function scriptDispatcher(e: ErrorEvent | PromiseRejectionEvent) {
  try {
    const { type } = e
    if (type === 'error') {
      const targetEvent = e as ErrorEvent
      const { message, error } = targetEvent
      const immutableTarget = e.target || e.srcElement
      if (message && error)
        uncaughtErrorHandler(targetEvent)
      else if (immutableTarget)
        resourceErrorHandler(targetEvent)
    }
    else if (type === 'unhandledrejection') {
      unhandledrejectionErrorHandler(e as PromiseRejectionEvent)
    }
    else {
      unknownErrorHandler(e)
    }
  }
  catch (error) {
    unknownErrorHandler(error)
  }
}
