import { record } from 'rrweb'
import { eventWithTime } from 'rrweb/typings/types'
import { Plugin, Capture, State } from '@ohbug/types'

const plugin: Plugin = () => {
  const rrwebEvents: eventWithTime[] = []
  let _stop: (() => void) | undefined
  let hasStopped = false

  const capture: Capture = () => {
    _stop = record({
      emit(event) {
        rrwebEvents.push(event)
      }
    })
  }

  const state: State = () => {
    if (!hasStopped) {
      _stop && _stop()
      hasStopped = true

      return {
        rrwebEvents
      }
    }
    return {}
  }

  return {
    capture,
    state
  }
}

export default plugin
