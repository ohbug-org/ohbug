import type { OhbugEvent } from './event'

export type OhbugExecution = 'sync' | 'async'

type OhbugCreateEvent = <D>(
  type: string,
  detail: D,
  category?: 'error' | 'message' | 'feedback' | 'other' | undefined
) => OhbugEvent<D>
type OhbugCollect = (event: OhbugEvent<any> | any, execution?: OhbugExecution) => void
export interface OhbugCaptureCtx {
  createEvent: OhbugCreateEvent
  collect: OhbugCollect
}

export interface OhbugPlugin {
  capture?(ctx: OhbugCaptureCtx): void
  state?(event: OhbugEvent<any>): Record<string, any>
  event?(event: OhbugEvent<any>): OhbugEvent<any>
}

export type OhbugEnhancer = OhbugPlugin[]
