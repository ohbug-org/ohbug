import equal from 'fast-deep-equal'
import { getOhbugObject } from './config'

type Issue = any
type Callback = (issues: Issue[]) => void

export class Hub {
  private readonly issues: Issue[] = []
  private readonly callback: Callback

  constructor(callback: Callback) {
    this.callback = callback
  }

  public add(issue: Issue) {
    if (this.issues.length) {
      // Filter the merge with the same issue
      const isRepeated = this.issues.find((_issue: Issue) => equal(_issue, issue))
      if (!isRepeated) {
        this.issues.push(issue)
      }
    } else {
      this.issues.push(issue)
    }

    this.callback(this.issues)
  }
}

export function getHub<T>(callback: Callback): Hub {
  const ohbugObject = getOhbugObject<T>()

  if (ohbugObject && ohbugObject.hub) {
    return ohbugObject.hub
  }

  const hub = new Hub(callback)
  ohbugObject.hub = hub
  return hub
}
