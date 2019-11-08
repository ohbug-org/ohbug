import { debounce } from '@ohbug/utils'
import { Hub } from './hub'
import { getConfig } from './config'
import { getEnhancer } from './enhancer'
import { WrappedIssue } from './interface'
import report from './report'

function issueProcessor(issues: WrappedIssue<any>[]) {
  const config = getConfig()
  debounce(() => {
    if (issues.length <= (config.maxIssue as number)) {
      report(issues)
    }
  }, config.delay)()
}

const hub = new Hub(issueProcessor)

/**
 * Used to store the wrappedIssue in the hub and handle the collector in the middleware
 *
 * @param wrappedIssue issues
 */
function collector(wrappedIssue: WrappedIssue<any>) {
  // Insert middleware
  const enhancer = getEnhancer()
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
