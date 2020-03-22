import { Event, Action } from './event'
import { Execution } from './enhancer'

export interface Hub {
  addEvent<T>(event: Event<T>, execution: Execution): void

  getActions(): Action[]

  addAction(action: Action): void
}
