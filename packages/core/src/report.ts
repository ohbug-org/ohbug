import { logger, getGlobal } from '@ohbug/utils'
import { getConfig } from './config'
import { WrappedIssue } from './interface'

const global = getGlobal()

function report(issues: WrappedIssue<any>[]) {
  try {
    const config = getConfig()
    if (config) {
      let result = issues
      if (config.beforeReport) {
        result = config.beforeReport(issues)
      }
      if (global.__OHBUG__._report) {
        global.__OHBUG__._report(result)
        config.reported && config.reported(result)
      }
    }
  } catch (e) {
    logger.error(`Ohbug: 发送日志失败`, e)
  }
}

export default report
