import type { OhbugDevice } from './device'
import { OhbugUser } from './user'
import { OhbugAction } from './action'

export type OhbugCategory = 'error' | 'message' | 'feedback' | 'view' | 'performance' | 'other'
export type OhbugReleaseStage = 'development' | 'production' | string

export interface OhbugEvent<D> {
  apiKey: string
  appVersion?: string
  appType?: string
  timestamp: string
  category?: OhbugCategory
  type: string
  device: OhbugDevice
  detail: D
  user?: OhbugUser
  actions?: OhbugAction[]
  metaData?: any
  releaseStage?: OhbugReleaseStage
}

export interface OhbugBaseDetail {
  message?: string
}

export interface OhbugCreateEvent<D> {
  category?: OhbugCategory
  type: string
  detail: D
}
