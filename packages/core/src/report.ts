import { logger } from '@ohbug/utils'
import { getConfig, getOhbugObject } from './config'
import { Event } from './interface'

function report<T = Window>(event: Event<any>) {
  const config = getConfig<T>()
  try {
    if (config) {
      let result = event
      if (config.beforeReport) {
        result = config.beforeReport(event)
      }
      const ohbugObject = getOhbugObject<T>()
      if (ohbugObject._report) {
        ohbugObject._report(result)
        config.reported && config.reported(result)
      }
    }
  } catch (e) {
    logger.error(`Ohbug: Send log failed`, e)
  }
}

export default report
