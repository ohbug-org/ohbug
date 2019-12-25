import { Event, Breadcrumb } from './interface'
import { getOhbugObject } from './config'
import report from './report'

export class Hub {
  private readonly events: Event<any>[] = []

  private readonly report = report

  private readonly breadcrumbs: Breadcrumb[] = []

  public addEvent<T>(event: Event<T>): void {
    this.events.push(event)

    this.report(event)
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
