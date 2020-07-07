import type {
  OhbugClient,
  OhbugConfig,
  OhbugSchema,
  OhbugLoggerConfig,
  OhbugExtension,
  OhbugCreateEvent,
  OhbugEvent,
} from '@ohbug/types'
import { logger } from '@ohbug/utils'

import { schema as baseSchema } from './config'
import { loadExtension } from './extension'
import { verifyConfig } from './lib/verifyConfig'
import { getConfigErrorMessage } from './lib/getConfigErrorMessage'
import { createEvent } from './event'

export class Client implements OhbugClient {
  readonly _config: OhbugConfig
  readonly _logger: OhbugLoggerConfig

  constructor(baseConfig: OhbugConfig, schema: OhbugSchema = baseSchema) {
    const { config, errors } = verifyConfig(baseConfig, schema)

    this._config = config
    this._logger = this._config.logger || logger

    if (Object.keys(errors).length) {
      this._logger.warn(getConfigErrorMessage(errors, baseConfig))
    }
  }

  use(extension: OhbugExtension): Client {
    loadExtension(extension, this)
    return this
  }

  createEvent<D>(value: OhbugCreateEvent<D>): OhbugEvent<D> {
    return createEvent(value, this)
  }
}
