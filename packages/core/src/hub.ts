import equal from 'fast-deep-equal'
import { getOhbugObject } from './config'

type Issue = any
type Callback = (issues: Issue[]) => void

export class Hub {
  private readonly issues: Issue[] = []

  public add(issue: Issue, callback: Callback) {
    if (this.issues.length) {
      // Filter the merge with the same issue
      const isRepeated = this.issues.find((_issue: Issue) => equal(_issue, issue))
      if (!isRepeated) {
        this.issues.push(issue)
      }
    } else {
      this.issues.push(issue)
    }

    callback(this.issues)
  }

  public clear() {
    this.issues.length = 0
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
