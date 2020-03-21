import { record } from 'rrweb'
import { eventWithTime } from 'rrweb/typings/types'
import { Plugin, PluginCapturer, PluginCollector } from '@ohbug/types'

const plugin: Plugin = () => {
  const rrwebEvents: eventWithTime[] = []
  let _stop: (() => void) | undefined
  let hasStopped = false

  const capturer: PluginCapturer = () => {
    _stop = record({
      emit(event) {
        rrwebEvents.push(event)
      }
    })
  }

  const collector: PluginCollector = () => {
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
    capturer,
    collector
  }
}

export default plugin
