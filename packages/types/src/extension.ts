import type { OhbugClient } from './client'

export interface OhbugExtension {
  name: string
  apply: (client: OhbugClient) => void
}
