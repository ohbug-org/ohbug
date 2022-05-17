import type { OhbugClient } from './client'
import type { OhbugEvent, OhbugEventWithMethods } from './event'

export interface OhbugExtension {
  name: string
  setup?: (client: OhbugClient, ...args: any[]) => void
  created?: <D = any>(
    event: OhbugEventWithMethods<D>,
    client: OhbugClient
  ) => OhbugEventWithMethods<D> | null
  notified?: <D = any>(
    event: OhbugEventWithMethods<D>,
    client: OhbugClient
  ) => void
}

export interface OhbugExtensionUI {
  name: string
  key: string
  component: <D = any>(event: OhbugEvent<D>, root: HTMLDivElement) => void
}
