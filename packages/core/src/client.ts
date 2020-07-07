import type { OhbugConfig, OhbugSchema } from '@ohbug/types'
import { logger } from '@ohbug/utils'

import { schema as baseSchema } from './config'
import { verifyConfig } from './lib/verifyConfig'
import { getConfigErrorMessage } from './lib/getConfigErrorMessage'

class Client {
  private readonly config: OhbugConfig

  constructor(baseConfig: OhbugConfig, schema: OhbugSchema = baseSchema) {
    const { config, errors } = verifyConfig(baseConfig, schema)

    this.config = config

    if (Object.keys(errors).length) {
      logger.warn(getConfigErrorMessage(errors, baseConfig))
    }
  }
}

export default Client
