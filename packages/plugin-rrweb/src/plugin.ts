import { record } from 'rrweb'
import { eventWithTime } from 'rrweb/typings/types'
import { Plugin, PluginCapture, PluginCollect } from '@ohbug/types'

const plugin: Plugin = () => {
  const rrwebEvents: eventWithTime[] = []
  let _stop: (() => void) | undefined
  let hasStopped = false

  const capture: PluginCapture = () => {
    _stop = record({
      emit(event) {
        rrwebEvents.push(event)
      }
    })
  }

  const collect: PluginCollect = () => {
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
    collect
  }
}

export default plugin
