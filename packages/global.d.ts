import type { OhbugObject } from '@ohbug/types'

declare global {
  interface Window {
    __OHBUG__: OhbugObject
  }
}
