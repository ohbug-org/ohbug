import { Config } from './config'
import { Platform } from './tags'
import { Event } from './event'
import { OhbugPlugin } from './enhancer'

export interface Init {
  config: Config
  platform: Platform
  handleCapture: () => void
  handleReport: (event: Event<any>) => void
  handleAsync: () => void
  handleDestroy?: () => void
  plugins?: OhbugPlugin[]
}
