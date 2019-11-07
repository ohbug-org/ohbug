import equal from 'fast-deep-equal'

type Issue = any
type Callback = (issues: Issue[]) => void

export class Hub {
  private readonly issues: Issue[] = []
  private callback: Callback

  constructor(callback: Callback) {
    this.callback = callback
  }

  public add(issue: Issue) {
    if (this.issues.length) {
      // 相同错误进行过滤合并
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
