import { logger } from '@ohbug/utils'
import { getConfig, getOhbugObject } from './config'
import { WrappedIssue } from './interface'

function report<T>(issues: WrappedIssue<any>[]) {
  try {
    const config = getConfig()
    if (config) {
      let result = issues
      if (config.beforeReport) {
        result = config.beforeReport(issues)
      }
      const ohbugObject = getOhbugObject<T>()
      if (ohbugObject._report) {
        ohbugObject._report(result)
        config.reported && config.reported(result)
      }
    }
  } catch (e) {
    logger.error(`Ohbug: 发送日志失败`, e)
  }
}

export default report
