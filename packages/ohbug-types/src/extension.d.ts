import type { OhbugClient } from './client'
import type { OhbugEventWithMethods } from './event'

export interface OhbugExtension {
  name: string
  setup?: (client: OhbugClient) => void
  onEvent?: <D = any>(
    event: OhbugEventWithMethods<D>,
    client: OhbugClient
  ) => OhbugEventWithMethods<D> | null
  onNotify?: <D = any>(
    event: OhbugEventWithMethods<D>,
    client: OhbugClient
  ) => void
}
