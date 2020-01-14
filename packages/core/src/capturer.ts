import { getEnhancer } from './enhancer'
import createEvent, { createOtherEvent } from './createEvent'
import collector from './collector'

export interface MiddlewareCapturerContext {
  createEvent: typeof createEvent
  collector: typeof collector
}

/**
 * Used to execute all capture functions
 *
 * @param capturers All the capture functions that need to be executed
 */
function capturer<T = Window>(...capturers: (() => void)[]) {
  capturers.forEach(c => c())
  // Insert middleware
  const enhancer = getEnhancer<T>()
  if (enhancer) {
    const { capturers: EnhanceCapturers } = enhancer
    if (Array.isArray(EnhanceCapturers) && EnhanceCapturers.length) {
      const ctx = {
        createEvent: createOtherEvent,
        collector
      }
      EnhanceCapturers.filter(c => Boolean(c)).forEach(c => c(ctx))
    }
  }
}

export default capturer
