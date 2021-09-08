/* eslint-disable no-restricted-globals */
/* eslint-disable no-nested-ternary */
import type { OhbugGlobal, OhbugObject } from '@ohbug/types'
import { error } from './warning'

const fallbackGlobalObject = {}
export function getGlobal<T = Window>(): T & OhbugGlobal {
  return (
    typeof window !== 'undefined'
      ? window
      : typeof global !== 'undefined'
      ? global
      : typeof self !== 'undefined'
      ? self
      : fallbackGlobalObject
  ) as T & OhbugGlobal
}

export function getOhbugObject<T = Window>(): OhbugObject {
  const global = getGlobal<T>()

  error(
    Boolean(global.__OHBUG__),
    'Failed to get `OhbugObject`, please confirm if `Ohbug.init`'
  )

  return global.__OHBUG__
}

export function isNode(): boolean {
  return typeof global !== 'undefined'
}

export function isBrowser(): boolean {
  return typeof window !== 'undefined'
}
