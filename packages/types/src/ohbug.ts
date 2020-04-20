import type { OhbugPlatform } from './tags'
import type { OhbugEvent } from './event'
import type { OhbugConfig } from './config'
import type { OhbugEnhancer, OhbugExecution } from './enhancer'
import type { OhbugHub } from './hub'
import type { OhbugQueue } from './queue'

export interface OhbugObject {
  uuid: string
  platform: OhbugPlatform
  version: string
  config?: OhbugConfig
  enhancer?: OhbugEnhancer
  hub?: OhbugHub
  _asyncQueue?: OhbugQueue
  _report?: (event: OhbugEvent<any>, execution: OhbugExecution) => void
}

export interface OhbugGlobal {
  __OHBUG__: OhbugObject
}
