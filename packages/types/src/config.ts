import type { OhbugEvent } from './event'
import type { OhbugClient } from './client'

export interface OhbugLoggerConfig {
  log: (...args: any[]) => void
  info: (...args: any[]) => void
  warn: (...args: any[]) => void
  error: (...args: any[]) => void
}

export interface OhbugConfig {
  // base
  apiKey: string
  appVersion?: string
  appType?: string
  // hooks
  created?: (event: OhbugEvent<any>, client: OhbugClient) => OhbugEvent<any>
  notified?: (event: OhbugEvent<any>, client: OhbugClient) => void
  // utils
  logger?: OhbugLoggerConfig
}
interface OhbugSchemaValue {
  defaultValue: any
  message: string
  validate: (value: any) => boolean
}
export type OhbugSchema = Record<keyof OhbugConfig, OhbugSchemaValue>
