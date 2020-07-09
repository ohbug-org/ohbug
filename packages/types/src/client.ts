import type { OhbugExtension } from './extension'
import type { OhbugConfig, OhbugLoggerConfig, OhbugSchema } from './config'
import type { OhbugCreateEvent, OhbugEvent } from './event'
import type { OhbugDevice } from './device'
import type { OhbugNotifier } from './notify'
import type { OhbugAction } from './action'
import type { OhbugUser } from './user'

export interface OhbugClientConstructorValues {
  config: OhbugConfig
  schema?: OhbugSchema
  device: OhbugDevice
  notifier: OhbugNotifier
}
export interface OhbugClientConstructor {
  new (values: OhbugClientConstructorValues): OhbugClient
}

export interface OhbugHooks {
  created: (...args: any[]) => OhbugEvent<any>
  notified: (...args: any[]) => void
}

export interface OhbugClient {
  readonly _config: OhbugConfig
  readonly _logger: OhbugLoggerConfig
  readonly _device: OhbugDevice
  readonly _notifier: OhbugNotifier

  readonly _actions: OhbugAction[]
  readonly _extensions: OhbugExtension[]
  readonly _hooks: OhbugHooks
  _user: OhbugUser
  readonly _metaData: Map<string, any>

  use: (extension: OhbugExtension) => OhbugClient
  createEvent: <D = any>(value: OhbugCreateEvent<D>) => OhbugEvent<D>
  notify: <D = any>(
    eventLike: any,
    beforeNotify?: (event: OhbugEvent<D>) => OhbugEvent<D> | false
  ) => Promise<any>
  addAction: (message: string, data: Record<string, any>, type: string, timestamp?: string) => void
  getUser: () => OhbugUser | undefined
  setUser: (user: OhbugUser) => OhbugUser | undefined
  addMetaData: (section: string, data: any) => any
  getMetaData: (section: string) => any
  deleteMetaData: (section: string) => any
}
