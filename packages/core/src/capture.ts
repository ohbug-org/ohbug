import { getEnhancer } from './enhancer'
import { createOtherEvent } from './createEvent'
import collect from './collect'
import type { OhbugCaptureCtx } from '@ohbug/types'

/**
 * Used to execute all capture functions
 *
 * @param captureHandler
 */
function capture<T = Window>(captureHandler: Function) {
  captureHandler()
  // Insert plugin
  const enhancer = getEnhancer<T>()
  if (Array.isArray(enhancer) && enhancer.length) {
    const ctx: OhbugCaptureCtx = {
      createEvent: createOtherEvent,
      collect,
    }
    enhancer.forEach((plugin) => plugin.capture?.(ctx))
  }
}

export default capture
