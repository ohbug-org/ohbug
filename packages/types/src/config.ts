import { Event } from './event'

export interface Config {
  apiKey: string
  appVersion?: string
  appType?: string
  beforeReport?: (event: Event<any>) => Event<any>
  reported?: (event: Event<any>) => void
}
