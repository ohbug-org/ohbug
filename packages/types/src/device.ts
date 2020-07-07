export type OhbugPlatform = 'browser' | 'node'

export interface OhbugDevice {
  uuid: string
  platform: OhbugPlatform
  version: string
  // browser
  language?: string
  userAgent?: string
  title?: string
  url?: string
}
