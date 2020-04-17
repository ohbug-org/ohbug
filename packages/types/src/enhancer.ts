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

export interface OhbugPluginInstance {
  capture?(ctx: CaptureCtx): void
  state?(event: Event<any>): Record<string, any>
  event?(event: Event<any>): Event<any>
}

export interface OhbugPlugin extends OhbugPluginInstance {
  new?(config?: Config): void
  config?: Config
}
export type Enhancer = OhbugPluginInstance[]
