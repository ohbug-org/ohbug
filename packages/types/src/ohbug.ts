import { OhbugPlatform } from './tags'
import { OhbugEvent } from './event'
import { OhbugConfig } from './config'
import { OhbugEnhancer, OhbugExecution } from './enhancer'
import { OhbugHub } from './hub'
import { OhbugQueue } from './queue'

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
