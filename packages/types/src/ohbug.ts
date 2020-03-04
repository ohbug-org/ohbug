import { Platform, Event } from './event'
import { Config } from './config'
import { Enhancer, Execution } from './enhancer'
import { Hub } from './hub'
import { Queue } from './queue'

export interface OhbugObject {
  platform: Platform
  version: string
  config?: Config
  enhancer?: Enhancer
  hub?: Hub
  _asyncQueue?: Queue
  _report?: (event: Event<any>, execution: Execution) => void
}

export interface OhbugGlobal {
  __OHBUG__: OhbugObject
}
