export type Platform = 'browser' | 'node'

export interface Tags {
  platform: Platform
  version: string
  // browser
  language?: string
  userAgent?: string
  title?: string
  url?: string
}

export interface Breadcrumb {
  type: string
  timestamp: number
  message?: string
  data?: { [key: string]: any }
}

export type Category = 'error' | 'message' | 'feedback' | 'other'

export interface Event<D> {
  apiKey: string
  appVersion?: string
  appType?: string
  timestamp: number | string
  category?: Category
  type: string
  detail: D
  tags: Tags
  breadcrumbs: Breadcrumb[]
  state?: any
}
