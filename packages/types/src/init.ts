import type { OhbugConfig } from './config'
import type { OhbugPlatform } from './tags'
import type { OhbugEvent } from './event'
import type { OhbugPlugin } from './enhancer'

export interface OhbugInit {
  config: OhbugConfig
  platform: OhbugPlatform
  handleCapture: () => void
  handleReport: (event: OhbugEvent<any>) => void
  handleAsync: () => void
  handleDestroy?: () => void
  plugins?: OhbugPlugin[]
}
