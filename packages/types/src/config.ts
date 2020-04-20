import { OhbugEvent } from './event'

export interface OhbugConfig {
  apiKey: string
  appVersion?: string
  appType?: string
  beforeReport?: (event: OhbugEvent<any>) => OhbugEvent<any>
  reported?: (event: OhbugEvent<any>) => void
}
