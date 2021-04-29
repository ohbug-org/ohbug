import { OhbugAction } from '@ohbug/types'

export class Action implements OhbugAction {
  readonly type: string

  readonly timestamp: string

  readonly message: string

  readonly data: Record<string, any>

  constructor(
    message: string,
    data: Record<string, any>,
    type: string,
    timestamp?: string
  ) {
    this.type = type
    this.timestamp = timestamp || new Date().toISOString()
    this.message = message
    this.data = data
  }
}
