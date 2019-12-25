import { Event } from './interface'
import { getOhbugObject } from './config'
import report from './report'

export class Hub {
  private readonly events: Event<any>[] = []
  private readonly report = report

  public add<T>(event: Event<T>) {
    this.events.push(event)

    this.report(event)
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
