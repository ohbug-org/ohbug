import { Config } from './config'
import { Platform } from './tags'
import { Event } from './event'
import { Enhancer } from './enhancer'

export interface Init {
  config: Config
  platform: Platform
  handleCapture: () => void
  handleReport: (event: Event<any>) => void
  handleAsync: () => void
  handleDestroy?: () => void
  enhancer?: (config: Config) => Enhancer
}
