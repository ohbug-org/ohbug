import { Event } from '@ohbug/core'
import equal from 'fast-deep-equal'
import { getOhbugObject } from './config'

type Callback = (events: Event<any>[]) => void

export class Hub {
  private readonly events: Event<any>[] = []

  public add(event: Event<any>, callback: Callback) {
    if (this.events.length) {
      // Filter the merge with the same event
      const isRepeated = this.events.find((_event: Event<any>) => equal(_event, event))
      if (!isRepeated) {
        this.events.push(event)
      }
    } else {
      this.events.push(event)
    }

    callback(this.events)
  }

  public clear() {
    this.events.length = 0
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
