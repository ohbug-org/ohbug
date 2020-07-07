import type { OhbugDevice } from './device'

export interface OhbugAction {
  type: string
  timestamp: string
  message?: string
  data?: Record<string, any>
}

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
  actions?: OhbugAction[]
  state?: any
}

export interface OhbugBaseDetail {
  message?: string
}
