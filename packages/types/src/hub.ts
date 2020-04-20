import { OhbugEvent, OhbugAction } from './event'
import { OhbugExecution } from './enhancer'

export interface OhbugHub {
  addEvent<T>(event: OhbugEvent<T>, execution: OhbugExecution): void

  getActions(): OhbugAction[]

  addAction(action: OhbugAction): void
}
