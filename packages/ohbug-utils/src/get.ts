import type { OhbugGlobal, OhbugObject } from '@ohbug/types'
import { error } from './warning'

const fallbackGlobalObject = {}
export function getGlobal<T = Window>(): T & OhbugGlobal {
  return (typeof window !== 'undefined'
    ? window
    : typeof global !== 'undefined'
    ? global
    : typeof self !== 'undefined'
    ? self
    : fallbackGlobalObject) as T & OhbugGlobal
}

export function getOhbugObject<T = Window>(): OhbugObject {
  const _global = getGlobal<T>()

  error(
    Boolean(_global.__OHBUG__),
    'Failed to get `OhbugObject`, please confirm if `Ohbug.init`'
  )

  return _global.__OHBUG__
}

export function isNode(): boolean {
  return typeof global !== 'undefined'
}

export function isBrowser(): boolean {
  return typeof window !== 'undefined'
}
