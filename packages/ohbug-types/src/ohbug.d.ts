import type { OhbugClient } from './client'

export interface OhbugObject {
  client: OhbugClient
}

export interface OhbugGlobal {
  __OHBUG__: OhbugObject
}
