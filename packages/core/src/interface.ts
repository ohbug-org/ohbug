import { Config } from './config'
import { Enhancer } from './enhancer'

export interface Tags {
  platform: Platform
  version: string
  time: number
  // browser
  language?: string
  userAgent?: string
  title?: string
  url?: string
}

export interface WrappedIssue<T> {
  appid: string
  type: string
  detail: T
  tags: Tags
  state?: any
}

export type Platform = 'browser' | 'node'
export interface OhbugObject {
  platform: Platform
  version: string
  auth?: boolean
  config?: Config
  enhancer?: Enhancer
  _report?: (issues: WrappedIssue<any>[]) => void
}
export interface OhbugGlobal {
  __OHBUG__: OhbugObject
}
