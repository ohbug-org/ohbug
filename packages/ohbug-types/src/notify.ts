import { OhbugEventWithMethods } from './event'

export type OhbugNotifier = (event: OhbugEventWithMethods<any>) => Promise<any> | any
