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
  OhbugNotifier,
  OhbugHooks,
  OhbugUser,
} from '@ohbug/types'
import { logger, isFunction } from '@ohbug/utils'

import { schema as baseSchema } from './config'
import { loadExtension } from './extension'
import { createEvent, isEvent } from './event'
import { notify } from './notify'
import { verifyConfig } from './lib/verifyConfig'
import { getConfigErrorMessage } from './lib/getConfigErrorMessage'

export const Client: OhbugClientConstructor = class Client implements OhbugClient {
  readonly _config: OhbugConfig
  readonly _logger: OhbugLoggerConfig
  readonly _device: OhbugDevice
  readonly _notifier: OhbugNotifier

  readonly _actions: OhbugAction[]
  readonly _extensions: OhbugExtension[]
  readonly _hooks: OhbugHooks
  readonly _user: OhbugUser

  constructor({
    config: baseConfig,
    schema = baseSchema,
    device,
    notifier,
  }: OhbugClientConstructorValues) {
    const { config, errors } = verifyConfig(baseConfig, schema)

    // initialization
    this._config = config
    this._logger = config.logger || logger
    this._device = device
    this._notifier = notifier

    this._actions = []
    this._extensions = []
    this._hooks = {
      created: config.created,
      notified: config.notified,
    }
    this._user = config.user

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

    if (isFunction(this._hooks.created)) {
      // trigger created hook
      return this._hooks.created(event, this)
    }
    return event
  }

  /**
   * Used to trigger the reporting interface
   * 用于触发上报接口
   *
   * @param eventLike
   * @param beforeNotify
   */
  notify<D = any>(
    eventLike: any,
    beforeNotify?: (event: OhbugEvent<D>) => OhbugEvent<D> | false
  ): Promise<any | null> {
    let event: OhbugEvent<D> | false
    if (!isEvent(eventLike)) {
      event = this.createEvent(eventLike)
    } else {
      event = eventLike
    }

    if (beforeNotify) event = beforeNotify(event)

    return notify<D>(event, this)
  }
}
