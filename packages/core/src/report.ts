import { logger, debounce } from '@ohbug/utils'
import { getConfig, getOhbugObject } from './config'
import { Event } from './interface'
import { getHub } from './hub'

function report<T = Window>(events: Event<any>[]) {
  const config = getConfig<T>()
  const hub = getHub<T>()
  debounce(() => {
    if (events.length <= (config.maxEvent as number)) {
      try {
        if (config) {
          let result = events
          if (config.beforeReport) {
            result = config.beforeReport(events)
          }
          const ohbugObject = getOhbugObject<T>()
          if (ohbugObject._report) {
            ohbugObject._report(result)
            config.reported && config.reported(result)
            hub.clear()
          }
        }
      } catch (e) {
        logger.error(`Ohbug: Send log failed`, e)
      }
    }
  }, config.delay)()
}

export default report
