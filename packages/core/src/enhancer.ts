import createEvent from './createEvent'
import collector from './collector'
import { Event } from './interface'
import { getOhbugObject } from './config'

interface CapturerCtx {
  createEvent: typeof createEvent
  collector: typeof collector
}
type Capturer = (ctx: CapturerCtx) => void
type Collector = (issue: Event<any>) => any
export interface Enhancer {
  capturers: Capturer[]
  collectors: Collector[]
}

export function getEnhancer<T>() {
  return getOhbugObject<T>().enhancer
}
