import { getHub } from './hub'
import { getEnhancer } from './enhancer'
import type { OhbugEvent, OhbugExecution } from '@ohbug/types'

/**
 * Used to store the event in the hub and handle the collect in the plugin
 *
 * @param event
 * @param execution
 */
function collect<T = Window>(event: OhbugEvent<any> | any, execution: OhbugExecution = 'sync') {
  const hub = getHub<T>()
  let enhancedEvent = event

  // Insert plugin
  const enhancer = getEnhancer<T>()
  if (Array.isArray(enhancer) && enhancer.length) {
    // compose enhancer.event
    enhancedEvent = enhancer.reduce(
      (pre: (e: OhbugEvent<any>) => OhbugEvent<any>, cur) => {
        if (cur.event) {
          return (_event) => pre(cur.event!(_event))
        }
        return (_event) => pre(_event)
      },
      (e: OhbugEvent<any>) => e
    )(event)

    const state = enhancer.reduce((pre, cur) => ({ ...pre, ...cur?.state?.(enhancedEvent) }), {})

    if (Object.keys(state).length) {
      enhancedEvent.state = state
    }
  }

  hub.addEvent(enhancedEvent, execution)
}

export default collect
