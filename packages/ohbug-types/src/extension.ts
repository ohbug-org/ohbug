import type { OhbugClient } from './client'
import type { OhbugEvent, OhbugEventWithMethods } from './event'

export interface OhbugExtension<T = any> {
  name: string
  init?: (client: OhbugClient, ...args: any[]) => T
  created?: (
    event: OhbugEventWithMethods<any>,
    client: OhbugClient
  ) => OhbugEventWithMethods<any> | false
  notified?: (event: OhbugEventWithMethods<any>, client: OhbugClient) => void
}

export interface OhbugExtensionUIComponentProps {
  event: OhbugEvent<any>
}
export interface OhbugExtensionUI {
  name: string
  key: string
  components: {
    event?: any
    analysis?: any
  }
}
