import type { OhbugClient } from './client'

export interface OhbugDevice {
  // browser
  language?: string
  userAgent?: string
  title?: string
  url?: string

  [key: string]: any
}

export type OhbugGetDevice = (client?: OhbugClient) => OhbugDevice
