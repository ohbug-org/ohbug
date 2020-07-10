import type { OhbugClient } from './client'
import { OhbugEvent } from './event'

export interface OhbugExtension<T = any> {
  name: string
  init?: (client: OhbugClient, ...args: any[]) => T
  created?: (event: OhbugEvent<any>, client: OhbugClient) => OhbugEvent<any>
  notified?: (event: OhbugEvent<any>, client: OhbugClient) => void
}
