import { Event } from './event'

export type Execution = 'sync' | 'async'
type CreateEvent = <D>(
  type: string,
  detail: D,
  category?: 'error' | 'message' | 'feedback' | 'other' | undefined
) => Event<D>
type Collector = (event: Event<any> | any, execution?: Execution) => void
interface CapturerCtx {
  createEvent: CreateEvent
  collector: Collector
}
type Capturer = (ctx: CapturerCtx) => void

type EnhancerCollector = (event: Event<any> | any, execution?: Execution) => any
export interface PluginCapturerContext {
  createEvent: CreateEvent
  collector: EnhancerCollector
}
export interface Enhancer {
  capturers: Capturer[]
  collectors: EnhancerCollector[]
}
