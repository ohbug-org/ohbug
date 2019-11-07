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

function collector(wrappedIssue: WrappedIssue<any>) {
  // 嵌入 middleware
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
