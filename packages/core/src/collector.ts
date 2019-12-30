import { getHub } from './hub'
import { getEnhancer, Enhancer } from './enhancer'
import { Event } from './interface'

/**
 * Used to store the event in the hub and handle the collector in the middleware
 *
 * @param event
 */
function collector<T = Window>(event: Event<any>) {
  const hub = getHub<T>()
  // Insert middleware
  const enhancer = getEnhancer<T>() as Enhancer
  if (Array.isArray(enhancer.collectors) && enhancer.collectors.length) {
    const state = enhancer.collectors
      .filter(c => Boolean(c))
      .reduce((pre, cur) => ({ ...pre, ...cur(event) }), {})
    hub.addEvent(
      Object.keys(state).length
        ? {
            ...event,
            state
          }
        : event
    )
  } else {
    hub.addEvent(event)
  }
}

export default collector
