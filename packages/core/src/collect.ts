import { Event, Execution } from '@ohbug/types'
import { getHub } from './hub'
import { getEnhancer } from './enhancer'

/**
 * Used to store the event in the hub and handle the collect in the plugin
 *
 * @param event
 * @param execution
 */
function collect<T = Window>(event: Event<any> | any, execution: Execution = 'sync') {
  const hub = getHub<T>()
  let enhancedEvent = event

  // Insert plugin
  const enhancer = getEnhancer<T>()
  if (Array.isArray(enhancer) && enhancer.length) {
    const filteredEnhancer = enhancer.filter(c => Boolean(c))

    // compose enhancer.event
    enhancedEvent = filteredEnhancer.reduce(
      (pre: (e: Event<any>) => Event<any>, cur) => {
        if (cur.event) {
          return _event => pre(cur.event!(_event))
        }
        return _event => pre(_event)
      },
      (e: Event<any>) => e
    )(event)

    const state = filteredEnhancer.reduce(
      (pre, cur) => ({ ...pre, ...cur?.state?.(enhancedEvent) }),
      {}
    )

    if (Object.keys(state).length) {
      enhancedEvent.state = state
    }
  }

  hub.addEvent(enhancedEvent, execution)
}

export default collect
