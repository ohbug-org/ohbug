export type OhbugPlatform = 'browser' | 'node'

export interface OhbugDevice {
  platform: OhbugPlatform
  version: string
  // browser
  language?: string
  userAgent?: string
  title?: string
  url?: string
}
