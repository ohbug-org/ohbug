import type { OhbugClient } from './client'
import { OhbugEvent } from './event'

export interface OhbugExtension {
  name: string
  init?: (client: OhbugClient) => void
  created?: (event: OhbugEvent<any>, client: OhbugClient) => OhbugEvent<any>
  notified?: (event: OhbugEvent<any>, client: OhbugClient) => void
}
