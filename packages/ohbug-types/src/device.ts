import type { OhbugClient } from './client'

export type OhbugPlatform = 'browser' | 'node' | string

export interface OhbugDevice {
  platform: OhbugPlatform
  version: string
  // browser
  language?: string
  userAgent?: string
  title?: string
  url?: string

  [key: string]: any
}

export type OhbugGetDevice = (client?: OhbugClient) => OhbugDevice
