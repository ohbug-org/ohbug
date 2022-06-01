import type { OhbugDevice } from './device'
import type { OhbugUser } from './user'
import type { OhbugAction } from './action'
import type { OhbugMetadata } from './metadata'

export type OhbugReleaseStage = 'development' | 'production' | string
export type OhbugCategory =
  | 'error'
  | 'message'
  | 'feedback'
  | 'view'
  | 'performance'
  | 'other'
export interface OhbugSDK {
  platform: string
  version: string
}

export interface OhbugEvent<D> {
  apiKey: string
  appVersion?: string
  appType?: string
  releaseStage?: OhbugReleaseStage
  timestamp: string
  category?: OhbugCategory
  type: string
  sdk: OhbugSDK

  detail: D
  device: OhbugDevice
  user?: OhbugUser
  actions?: OhbugAction[]
  metadata?: OhbugMetadata
}
export interface OhbugEventWithMethods<D> extends OhbugEvent<D> {
  addAction: (
    message: string,
    data: Record<string, any>,
    type: string,
    timestamp?: string
  ) => void
  getUser: () => OhbugUser | undefined
  setUser: (user: OhbugUser) => OhbugUser | undefined
  addMetadata: (section: string, data: any) => any
  getMetadata: (section: string) => any
  deleteMetadata: (section: string) => any
}

export interface OhbugBaseDetail {
  message?: string
}

export interface OhbugCreateEvent<D> {
  category?: OhbugCategory
  type: string
  detail: D
}
