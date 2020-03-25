import { Tags } from './tags'

export interface Action {
  type: string
  timestamp: number
  message?: string
  data?: Record<string, any>
}

export type Category = 'error' | 'message' | 'feedback' | 'view' | 'other'

export interface Event<D> {
  apiKey: string
  appVersion?: string
  appType?: string
  timestamp: number | string
  category?: Category
  type: string
  detail: D
  tags: Tags
  actions?: Action[]
  state?: any
}
