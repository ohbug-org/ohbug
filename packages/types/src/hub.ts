import { Event, Breadcrumb } from './event'
import { Execution } from './enhancer'

export interface Hub {
  addEvent<T>(event: Event<T>, execution: Execution): void

  getBreadcrumbs(): Breadcrumb[]

  addBreadcrumb(breadcrumb: Breadcrumb): void
}
