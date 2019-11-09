import createIssue from './createIssue'
import collector from './collector'
import { WrappedIssue } from './interface'
import { getOhbugObject } from './config'

interface CapturerCtx {
  createIssue: typeof createIssue
  collector: typeof collector
}
type Capturer = (ctx: CapturerCtx) => void
type Collector = (issue: WrappedIssue<any>) => any
export interface Enhancer {
  capturers: Capturer[]
  collectors: Collector[]
}

export function getEnhancer<T>() {
  return getOhbugObject<T>().enhancer
}
