import type { OhbugEvent } from './event'

export interface OhbugQueue {
  enqueue: (OhbugEvent: OhbugEvent<any>) => void

  dequeue: () => OhbugEvent<any> | undefined

  head: () => OhbugEvent<any>

  tail: () => OhbugEvent<any>

  size: () => number

  isEmpty: () => boolean

  clear: () => void

  forEach: (
    callback: (value: OhbugEvent<any>, index?: number, array?: OhbugEvent<any>[]) => void
  ) => void

  get: () => OhbugEvent<any>[]
}
