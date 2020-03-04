import { Event, Execution } from '@ohbug/types'
import { getHub } from './hub'
import { getEnhancer } from './enhancer'

/**
 * Used to store the event in the hub and handle the collector in the plugin
 *
 * @param event
 * @param execution
 */
function collector<T = Window>(event: Event<any> | any, execution: Execution = 'sync') {
  const hub = getHub<T>()
  // Insert plugin
  const enhancer = getEnhancer<T>()
  if (enhancer && Array.isArray(enhancer.collectors) && enhancer.collectors.length) {
    const state = enhancer.collectors
      .filter(c => Boolean(c))
      .reduce((pre, cur) => ({ ...pre, ...cur(event) }), {})
    hub.addEvent(
      Object.keys(state).length
        ? {
            ...event,
            state
          }
        : event,
      execution
    )
  } else {
    hub.addEvent(event, execution)
  }
}

export default collector
