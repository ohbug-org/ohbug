import { Config, Platform, Event, Enhancer } from '@ohbug/types'

export interface Init {
  config: Config
  platform: Platform
  handleCapture: () => void
  handleReport: (event: Event<any>) => void
  handleAsync: () => void
  handleDestroy?: () => void
  enhancer?: (config: Config) => Enhancer
}
