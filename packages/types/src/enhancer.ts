import { Event } from './event'
import { Config } from './config'

export type Execution = 'sync' | 'async'
type CreateEvent = <D>(
  type: string,
  detail: D,
  category?: 'error' | 'message' | 'feedback' | 'other' | undefined
) => Event<D>
export type Collect = (event: Event<any> | any, execution?: Execution) => void
export interface CaptureCtx {
  createEvent: CreateEvent
  collect: Collect
}

export type Capture = (ctx: CaptureCtx) => void
export type State = (event: Event<any> | any) => Record<string, any> | {} | void

export interface Enhancer {
  captures: Capture[]
  states: State[]
}

interface PluginOptions {
  config?: Config
}
export interface PluginReturn {
  capture?: Capture
  state?: State
}
export type Plugin = (options?: PluginOptions) => PluginReturn
