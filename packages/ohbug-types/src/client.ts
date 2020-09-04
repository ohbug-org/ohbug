import type { OhbugExtension } from './extension'
import type { OhbugConfig, OhbugLoggerConfig, OhbugSchema } from './config'
import type { OhbugCreateEvent, OhbugEventWithMethods, OhbugSDK } from './event'
import type { OhbugGetDevice } from './device'
import type { OhbugNotifier } from './notify'
import type { OhbugAction } from './action'
import type { OhbugUser } from './user'

export interface OhbugClientConstructorValues {
  sdk: OhbugSDK
  config: OhbugConfig
  schema?: OhbugSchema
  device: OhbugGetDevice
  notifier: OhbugNotifier
}
export interface OhbugClientConstructor {
  new (values: OhbugClientConstructorValues): OhbugClient
}

export interface OhbugHooks {
  created: (...args: any[]) => OhbugEventWithMethods<any> | false
  notified: (...args: any[]) => void
}

export interface OhbugClient {
  readonly _sdk: OhbugSDK
  readonly _config: OhbugConfig
  readonly _logger: OhbugLoggerConfig
  readonly _device: OhbugGetDevice
  readonly _notifier: OhbugNotifier

  readonly _extensions: OhbugExtension[]
  readonly _hooks: OhbugHooks

  readonly _actions: OhbugAction[]
  _user: OhbugUser
  readonly _metaData: Map<string, any>

  use: (extension: OhbugExtension, ...args: any[]) => OhbugClient | any
  createEvent: <D = any>(value: OhbugCreateEvent<D>) => OhbugEventWithMethods<D> | false
  notify: <D = any>(
    eventLike: any,
    beforeNotify?: (event: OhbugEventWithMethods<D> | false) => OhbugEventWithMethods<D> | false
  ) => Promise<any | null>
  addAction: (message: string, data: Record<string, any>, type: string, timestamp?: string) => void
  getUser: () => OhbugUser | undefined
  setUser: (user: OhbugUser) => OhbugUser | undefined
  addMetaData: (section: string, data: any) => any
  getMetaData: (section: string) => any
  deleteMetaData: (section: string) => any
}
