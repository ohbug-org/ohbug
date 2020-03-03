import { Queue } from '@ohbug/utils'
import { Config } from './config'
import { Enhancer } from './enhancer'
import { Hub } from './hub'

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
export type Execution = 'sync' | 'async'

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

export type Platform = 'browser' | 'node'
export interface OhbugObject {
  platform: Platform
  version: string
  config?: Config
  enhancer?: Enhancer
  hub?: Hub
  _asyncQueue?: Queue
  _report?: (event: Event<any>, execution: Execution) => void
}
export interface OhbugGlobal {
  __OHBUG__: OhbugObject
}

export interface BaseDetail {
  message?: string
}
