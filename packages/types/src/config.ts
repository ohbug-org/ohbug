import type { OhbugEvent } from './event'

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
  created?: (event: OhbugEvent<any>) => OhbugEvent<any>
  reported?: (event: OhbugEvent<any>) => void
  // utils
  logger?: OhbugLoggerConfig
}
interface OhbugSchemaValue {
  defaultValue: any
  message: string
  validate: (value: any) => boolean
}
export type OhbugSchema = Record<keyof OhbugConfig, OhbugSchemaValue>
