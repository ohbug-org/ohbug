import { CaptureCtx } from '@ohbug/types'
import { getEnhancer } from './enhancer'
import { createOtherEvent } from './createEvent'
import collect from './collect'

/**
 * Used to execute all capture functions
 *
 * @param captures All the capture functions that need to be executed
 */
function capture<T = Window>(captureHandler: Function) {
  captureHandler()
  // Insert plugin
  const enhancer = getEnhancer<T>()
  if (enhancer) {
    const { captures } = enhancer
    if (Array.isArray(captures) && captures.length) {
      const ctx: CaptureCtx = {
        createEvent: createOtherEvent,
        collect
      }
      captures.filter(c => Boolean(c)).forEach(c => c(ctx))
    }
  }
}

export default capture
