import type { OhbugExtension } from './extension'
import type { OhbugConfig, OhbugLoggerConfig, OhbugSchema } from './config'
import type { OhbugAction, OhbugCreateEvent, OhbugEvent } from './event'
import type { OhbugDevice } from './device'
import type { OhbugNotifier } from './notify'
import { OhbugUser } from './user'

export interface OhbugClientConstructorValues {
  config: OhbugConfig
  schema: OhbugSchema
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
  readonly _user: OhbugUser

  use: (extension: OhbugExtension) => OhbugClient
  createEvent: <D>(value: OhbugCreateEvent<D>) => OhbugEvent<D>
  notify: <D>(
    eventLike: any,
    beforeNotify?: (event: OhbugEvent<D>) => OhbugEvent<D> | false
  ) => Promise<any>
}
