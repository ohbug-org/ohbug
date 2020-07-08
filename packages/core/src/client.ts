import type {
  OhbugClient,
  OhbugConfig,
  OhbugLoggerConfig,
  OhbugExtension,
  OhbugCreateEvent,
  OhbugEvent,
  OhbugClientConstructor,
  OhbugClientConstructorValues,
  OhbugDevice,
  OhbugAction,
} from '@ohbug/types'
import { logger, isFunction, compose } from '@ohbug/utils'

import { schema as baseSchema } from './config'
import { loadExtension } from './extension'
import { createEvent } from './event'
import { verifyConfig } from './lib/verifyConfig'
import { getConfigErrorMessage } from './lib/getConfigErrorMessage'

export const Client: OhbugClientConstructor = class Client implements OhbugClient {
  readonly _config: OhbugConfig
  readonly _logger: OhbugLoggerConfig
  readonly _device: OhbugDevice
  readonly _actions: OhbugAction[]
  readonly _extensions: OhbugExtension[]

  constructor({ config: baseConfig, schema = baseSchema, device }: OhbugClientConstructorValues) {
    const { config, errors } = verifyConfig(baseConfig, schema)

    // initialization
    this._config = config
    this._logger = this._config.logger || logger
    this._device = device
    this._actions = []
    this._extensions = []

    if (Object.keys(errors).length) {
      this._logger.warn(getConfigErrorMessage(errors, baseConfig))
    }
  }

  /**
   * Load extension
   * 加载扩展
   *
   * @param extension
   */
  use(extension: OhbugExtension): Client {
    loadExtension(extension, this)
    return this
  }

  /**
   * Create an event, you will get a data body containing device actions and other information
   * 创建事件，将会得到一个含有 device actions 等信息的数据体
   *
   * @param value
   */
  createEvent<D>(value: OhbugCreateEvent<D>): OhbugEvent<D> {
    const event = createEvent(value, this)

    if (isFunction(this._config.created)) {
      // trigger created hook
      const extensionCreateds = this._extensions
        .filter(({ created }) => isFunction(created))
        .map(({ created }) => created)
      // @ts-ignore
      const created = compose(this._config.created, ...extensionCreateds)
      return created(event, this)
    }
    return event
  }
}
