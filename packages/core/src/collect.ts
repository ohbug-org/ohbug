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
  // Insert plugin
  const enhancer = getEnhancer<T>()
  if (enhancer && Array.isArray(enhancer.states) && enhancer.states.length) {
    const state = enhancer.states
      .filter(c => Boolean(c))
      .reduce((pre, cur) => {
        console.log('cur', cur(event))

        return { ...pre, ...cur(event) }
      }, {})
    console.log({ state })

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

export default collect
