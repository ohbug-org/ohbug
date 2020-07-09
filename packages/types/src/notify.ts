import { OhbugEvent } from './event'

export type OhbugNotifier = (event: OhbugEvent<any>) => Promise<any> | any
