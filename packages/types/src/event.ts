import type { OhbugTags } from './tags'

export interface OhbugAction {
  type: string
  timestamp: number
  message?: string
  data?: Record<string, any>
}

export type OhbugCategory = 'error' | 'message' | 'feedback' | 'view'

export interface OhbugEvent<D> {
  apiKey: string
  appVersion?: string
  appType?: string
  timestamp: number | string
  category?: OhbugCategory
  type: string
  tags: OhbugTags
  detail: D
  actions?: OhbugAction[]
  state?: any
}

export interface OhbugBaseDetail {
  message?: string
}
