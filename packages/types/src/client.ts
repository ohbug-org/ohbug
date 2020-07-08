import type { OhbugExtension } from './extension'
import type { OhbugConfig, OhbugLoggerConfig, OhbugSchema } from './config'
import type { OhbugAction, OhbugCreateEvent, OhbugEvent } from './event'
import type { OhbugDevice } from './device'

export interface OhbugClientConstructorValues {
  config: OhbugConfig
  schema: OhbugSchema
  device: OhbugDevice
}
export interface OhbugClientConstructor {
  new (values: OhbugClientConstructorValues): OhbugClient
}

export interface OhbugClient {
  readonly _config: OhbugConfig
  readonly _logger: OhbugLoggerConfig
  readonly _device: OhbugDevice
  readonly _actions: OhbugAction[]
  readonly _extensions: OhbugExtension[]

  use: (extension: OhbugExtension) => OhbugClient
  createEvent: <D>(value: OhbugCreateEvent<D>) => OhbugEvent<D>
}
