import type { OhbugExtension } from './extension'
import type { OhbugConfig, OhbugLoggerConfig } from './config'
import type { OhbugCreateEvent, OhbugEvent } from './event'

export interface OhbugClient {
  readonly _config: OhbugConfig
  readonly _logger: OhbugLoggerConfig

  use: (extension: OhbugExtension) => OhbugClient
  createEvent: <D>(value: OhbugCreateEvent<D>) => OhbugEvent<D>
}
