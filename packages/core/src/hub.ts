import { Event, Breadcrumb, Execution } from './interface'
import { getOhbugObject } from './config'
import report from './report'

export class Hub {
  private readonly events: Event<any>[] = []

  private readonly breadcrumbs: Breadcrumb[] = []

  public addEvent<T>(event: Event<T>, execution: Execution): void {
    this.events.push(event)

    report(event, execution)
  }

  public getBreadcrumbs(): Breadcrumb[] {
    return this.breadcrumbs
  }

  public addBreadcrumb(breadcrumb: Breadcrumb): void {
    const breadcrumbs = this.getBreadcrumbs()
    breadcrumbs.push(breadcrumb)
  }
}

export function getHub<T>(): Hub {
  const ohbugObject = getOhbugObject<T>()

  if (ohbugObject && ohbugObject.hub) {
    return ohbugObject.hub
  }

  const hub = new Hub()
  ohbugObject.hub = hub
  return hub
}
