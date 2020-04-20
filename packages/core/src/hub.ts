import { OhbugHub, OhbugEvent, OhbugAction, OhbugExecution } from '@ohbug/types'
import { getOhbugObject } from './config'
import report from './report'

class Hub implements OhbugHub {
  private readonly events: OhbugEvent<any>[] = []

  private readonly actions: OhbugAction[] = []

  public addEvent<T>(event: OhbugEvent<T>, execution: OhbugExecution): void {
    this.events.push(event)

    report(event, execution)
  }

  public getActions(): OhbugAction[] {
    return this.actions
  }

  public addAction(action: OhbugAction): void {
    const actions = this.getActions()
    actions.push(action)
  }
}

export function getHub<T>(): OhbugHub {
  const ohbugObject = getOhbugObject<T>()

  if (ohbugObject && ohbugObject.hub) {
    return ohbugObject.hub
  }

  const hub = new Hub()
  ohbugObject.hub = hub
  return hub
}
