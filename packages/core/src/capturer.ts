import { getEnhancer } from './enhancer'
import createIssue from './createIssue'
import collector from './collector'

function capturer(...capturers: (() => void)[]) {
  capturers.forEach(c => c())
  // 嵌入 middleware
  const enhancer = getEnhancer()
  if (enhancer) {
    const { capturers } = enhancer
    if (Array.isArray(capturers) && capturers.length) {
      const ctx = {
        createIssue,
        collector
      }
      capturers.filter(c => Boolean(c)).forEach(c => c(ctx))
    }
  }
}

export default capturer
