import type { OhbugEventWithMethods } from './event'

export type OhbugNotifier = <D = any>(
  event: OhbugEventWithMethods<D>
) => Promise<any> | any
