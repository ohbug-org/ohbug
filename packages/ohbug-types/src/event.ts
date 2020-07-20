import type { OhbugDevice } from './device'
import { OhbugUser } from './user'
import { OhbugAction } from './action'

export type OhbugCategory = 'error' | 'message' | 'feedback' | 'view' | 'performance' | 'other'
export type OhbugReleaseStage = 'development' | 'production' | string

export interface OhbugEvent<D> {
  apiKey: string
  appVersion?: string
  appType?: string
  releaseStage?: OhbugReleaseStage
  timestamp: string
  category?: OhbugCategory
  type: string

  detail: D
  device: OhbugDevice
  user?: OhbugUser
  actions?: OhbugAction[]
  metaData?: any
}
export interface OhbugEventWithMethods<D> extends OhbugEvent<D> {
  addAction: (message: string, data: Record<string, any>, type: string, timestamp?: string) => void
  getUser: () => OhbugUser | undefined
  setUser: (user: OhbugUser) => OhbugUser | undefined
  addMetaData: (section: string, data: any) => any
  getMetaData: (section: string) => any
  deleteMetaData: (section: string) => any
}

export interface OhbugBaseDetail {
  message?: string
}

export interface OhbugCreateEvent<D> {
  category?: OhbugCategory
  type: string
  detail: D
}
