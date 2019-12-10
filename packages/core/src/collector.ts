import { getHub } from './hub'
import { getEnhancer } from './enhancer'
import { Event } from './interface'
import report from './report'

/**
 * Used to store the event in the hub and handle the collector in the middleware
 *
 * @param event issues
 */
function collector<T = Window>(event: Event<any>) {
  const hub = getHub<T>()
  // Insert middleware
  const enhancer = getEnhancer<T>()
  if (enhancer) {
    const { collectors } = enhancer
    if (Array.isArray(collectors) && collectors.length) {
      const state = collectors
        .filter(c => Boolean(c))
        .reduce((pre, cur) => ({ ...pre, ...cur(event) }), {})
      const issue = Object.keys(state).length
        ? {
            ...event,
            state
          }
        : event
      hub.add(issue, report)
    }
  } else {
    hub.add(event, report)
  }
}

export default collector
