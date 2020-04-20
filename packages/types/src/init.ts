import { OhbugConfig } from './config'
import { OhbugPlatform } from './tags'
import { OhbugEvent } from './event'
import { OhbugPlugin } from './enhancer'

export interface OhbugInit {
  config: OhbugConfig
  platform: OhbugPlatform
  handleCapture: () => void
  handleReport: (event: OhbugEvent<any>) => void
  handleAsync: () => void
  handleDestroy?: () => void
  plugins?: OhbugPlugin[]
}
