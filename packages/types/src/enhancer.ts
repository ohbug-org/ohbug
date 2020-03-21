import { Event } from './event'
import { Config } from './config'

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
export interface Enhancer {
  capturers: Capturer[]
  collectors: EnhancerCollector[]
}

export interface PluginCapturerContext {
  createEvent: CreateEvent
  collector: EnhancerCollector
}
interface PluginReturn {
  capturer: (ctx: PluginCapturerContext) => void
  collector: (event: Event<any> | any) => Record<string, any>
}
interface PluginOptions {
  config?: Config
}
export type Plugin = (options: PluginOptions) => PluginReturn
