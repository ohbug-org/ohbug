import { Config, Platform, Event, Enhancer } from '@ohbug/types'

export interface Init {
  config: Config
  platform: Platform
  version: string
  handleCapture: () => void
  handleReport: (event: Event<any>) => void
  handleAsync: () => void
  enhancer?: (config: Config) => Enhancer
}
