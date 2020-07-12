import type { OhbugEvent, OhbugReleaseStage } from './event'
import type { OhbugClient } from './client'
import type { OhbugUser } from './user'
import type { OhbugMetaData } from './metaData'

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
  releaseStage?: OhbugReleaseStage
  endpoint?: string
  maxActions?: number
  // hooks
  created?: (event: OhbugEvent<any>, client: OhbugClient) => OhbugEvent<any> | false
  notified?: (event: OhbugEvent<any>, client: OhbugClient) => void
  // data
  user?: OhbugUser
  metaData?: OhbugMetaData
  // utils
  logger?: OhbugLoggerConfig
}
interface OhbugSchemaValue {
  defaultValue: any
  message: string
  validate: (value: any) => boolean
}
export type OhbugSchema = Record<keyof OhbugConfig, OhbugSchemaValue>
