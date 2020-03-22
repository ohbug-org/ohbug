import { Hub as IHub, Event, Action, Execution } from '@ohbug/types'
import { getOhbugObject } from './config'
import report from './report'

export class Hub implements IHub {
  private readonly events: Event<any>[] = []

  private readonly actions: Action[] = []

  public addEvent<T>(event: Event<T>, execution: Execution): void {
    this.events.push(event)

    report(event, execution)
  }

  public getActions(): Action[] {
    return this.actions
  }

  public addAction(action: Action): void {
    const actions = this.getActions()
    actions.push(action)
  }
}

export function getHub<T>(): IHub {
  const ohbugObject = getOhbugObject<T>()

  if (ohbugObject && ohbugObject.hub) {
    return ohbugObject.hub
  }

  const hub = new Hub()
  ohbugObject.hub = hub
  return hub
}
