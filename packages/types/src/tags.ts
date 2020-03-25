export type Platform = 'browser' | 'node'

export interface Tags {
  uuid: string
  platform: Platform
  version: string
  // browser
  language?: string
  userAgent?: string
  title?: string
  url?: string
}
