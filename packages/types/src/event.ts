import type { OhbugDevice } from './device'
import { OhbugUser } from './user'
import { OhbugAction } from './action'

export type OhbugCategory = 'error' | 'message' | 'feedback' | 'view' | 'other'

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
}

export interface OhbugBaseDetail {
  message?: string
}

export interface OhbugCreateEvent<D> {
  category?: OhbugCategory
  type: string
  detail: D
}
