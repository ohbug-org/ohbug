import { logger, debounce } from '@ohbug/utils'
import { getConfig, getOhbugObject } from './config'
import { WrappedIssue } from './interface'
import { getHub } from './hub'

function report<T = Window>(issues: WrappedIssue<any>[]) {
  const config = getConfig<T>()
  const hub = getHub<T>()
  debounce(() => {
    if (issues.length <= (config.maxIssue as number)) {
      try {
        if (config) {
          let result = issues
          if (config.beforeReport) {
            result = config.beforeReport(issues)
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
