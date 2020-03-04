import { Event } from './event'

export interface Queue {
  enqueue: (event: Event<any>) => void

  dequeue: () => Event<any> | undefined

  head: () => Event<any>

  tail: () => Event<any>

  size: () => number

  isEmpty: () => boolean

  clear: () => void

  forEach: (callback: (value: Event<any>, index?: number, array?: Event<any>[]) => void) => void

  get: () => Event<any>[]
}
