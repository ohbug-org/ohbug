import { Event } from './event'
import { Config } from './config'

export type Execution = 'sync' | 'async'
type CreateEvent = <D>(
  type: string,
  detail: D,
  category?: 'error' | 'message' | 'feedback' | 'other' | undefined
) => Event<D>
type Collect = (event: Event<any> | any, execution?: Execution) => void
interface CaptureCtx {
  createEvent: CreateEvent
  collect: Collect
}
type Capture = (ctx: CaptureCtx) => void

type EnhancerCollect = (event: Event<any> | any, execution?: Execution) => any
export interface Enhancer {
  captures: Capture[]
  collects: EnhancerCollect[]
}

export interface PluginCaptureContext {
  createEvent: CreateEvent
  collect: EnhancerCollect
}
export type PluginCapture = (ctx: PluginCaptureContext) => void
export type PluginCollect = (event: Event<any> | any) => Record<string, any> | {} | void
interface PluginReturn {
  capture?: PluginCapture
  collect?: PluginCollect
}
interface PluginOptions {
  config?: Config
}
export type Plugin = (options?: PluginOptions) => PluginReturn
