import { types, createIssue, collector, getConfig } from '@ohbug/core'
import { logger } from '@ohbug/utils'

const { MESSAGE } = types

type Detail = string

function captureMessageHandler(detail: Detail, include?: boolean) {
  const config = getConfig()
  const wrappedIssue = createIssue<Detail>(MESSAGE, detail)
  if (config!.include) {
    if (typeof config!.include === 'function') {
      if (include) {
        // 传入筛选选项 include 且 captureMessage 传入第二个参数 true
        config!.include() && collector(wrappedIssue)
      } else {
        // 传入筛选选项 include 但 captureMessage 未传入第二个参数 true, 此时走正常逻辑
        collector(wrappedIssue)
      }
    } else {
      logger.error('Ohbug: The parameter `include` type must be function')
    }
  } else if (!config!.include && include) {
    logger.error('Ohbug: `Ohbug.init` does not pass in parameters `include`')
  } else if (!config!.include && !include) {
    // 未传入筛选选项 include 且 captureMessage 未传入第二个参数 true
    collector(wrappedIssue)
  }
}

export default captureMessageHandler
