const fallbackGlobalObject = {}
export function getGlobal<T = Window>(): T {
  return (typeof window !== 'undefined'
    ? window
    : typeof global !== 'undefined'
    ? global
    : typeof self !== 'undefined'
    ? self
    : fallbackGlobalObject) as T
}

export function isNode(): boolean {
  return typeof global !== 'undefined'
}

export function isBrowser(): boolean {
  return typeof window !== 'undefined'
}
