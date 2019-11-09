import { debounce } from '@ohbug/utils'
import { getHub } from './hub'
import { getConfig } from './config'
import { getEnhancer } from './enhancer'
import { WrappedIssue } from './interface'
import report from './report'

function issueProcessor<T>(issues: WrappedIssue<any>[]) {
  const config = getConfig<T>()
  debounce(() => {
    if (issues.length <= (config.maxIssue as number)) {
      report(issues)
    }
  }, config.delay)()
}

/**
 * Used to store the wrappedIssue in the hub and handle the collector in the middleware
 *
 * @param wrappedIssue issues
 */
function collector<T = Window>(wrappedIssue: WrappedIssue<any>) {
  const hub = getHub<T>(issueProcessor)
  // Insert middleware
  const enhancer = getEnhancer<T>()
  if (enhancer) {
    const { collectors } = enhancer
    if (Array.isArray(collectors) && collectors.length) {
      const state = collectors
        .filter(c => Boolean(c))
        .reduce((pre, cur) => ({ ...pre, ...cur(wrappedIssue) }), {})
      const issue = Object.keys(state).length
        ? {
            ...wrappedIssue,
            state
          }
        : wrappedIssue
      hub.add(issue)
    }
  } else {
    hub.add(wrappedIssue)
  }
}

export default collector
