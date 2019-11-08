import { OhbugObject } from '@ohbug/core'

declare global {
  interface Window {
    __OHBUG__: OhbugObject
  }
}
