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
import { logger, isFunction, isString, isObject } from '@ohbug/utils'

import { schema as baseSchema } from './config'
import { loadExtension } from './extension'
import { createEvent, isEvent } from './event'
import { notify } from './notify'
import { Action } from './action'
import { verifyConfig } from './lib/verifyConfig'
import { getConfigErrorMessage, getErrorMessage } from './lib/getErrorMessage'
import { addMetaData, getMetaData, deleteMetaData } from './lib/metaData'

export const Client: OhbugClientConstructor = class Client implements OhbugClient {
  readonly _config: OhbugConfig
  readonly _logger: OhbugLoggerConfig
  readonly _device: OhbugDevice
  readonly _notifier: OhbugNotifier

  readonly _actions: OhbugAction[]
  readonly _extensions: OhbugExtension[]
  readonly _hooks: OhbugHooks
  _user: OhbugUser
  readonly _metaData: Map<string, any>

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
    this._metaData = new Map<string, any>()
    if (isObject(config.metaData)) {
      Object.keys(config.metaData).forEach((key) => {
        this.addMetaData(key, config.metaData[key])
      })
    }

    if (Object.keys(errors).length) {
      this._logger.warn(getConfigErrorMessage(errors, baseConfig))
    }
  }

  /**
   * Load extension
   * 加载扩展
   *
   * @param extension
   * @param args
   */
  use(extension: OhbugExtension, ...args: any[]): Client | any {
    return loadExtension(extension, this, ...args)
  }

  /**
   * Create an event, you will get a data body containing device actions and other information
   * 创建事件，将会得到一个含有 device actions 等信息的数据体
   *
   * @param value
   */
  createEvent<D = any>(value: OhbugCreateEvent<D>): OhbugEvent<D> | false {
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
    beforeNotify?: (event: OhbugEvent<D> | false) => OhbugEvent<D> | false
  ): Promise<any | null> {
    let event: OhbugEvent<D> | false
    if (Boolean(eventLike) && !isEvent(eventLike)) {
      event = this.createEvent(eventLike)
    } else {
      event = eventLike
    }

    if (beforeNotify) event = beforeNotify(event)

    return notify<D>(event, this)
  }

  /**
   * Add an action
   * 新增一个动作
   *
   * @param message
   * @param data
   * @param type
   * @param timestamp
   */
  addAction(message: string, data: Record<string, any>, type: string, timestamp?: string): void {
    message = isString(message) ? message : ''
    data = isObject(data) ? data : {}
    type = isString(type) ? type : ''

    const action = new Action(message, data, type, timestamp)
    this._actions.push(action)
  }

  /**
   * Get current user information
   * 获取当前的用户信息
   */
  getUser(): OhbugUser | undefined {
    return this._user
  }

  /**
   * Set current user information
   * 设置当前的用户信息
   */
  setUser(user: OhbugUser): OhbugUser | undefined {
    if (isObject(user) && Object.keys(user).length <= 6) {
      this._user = user
      return this.getUser()
    }
    this._logger.warn(
      getErrorMessage('setUser should be an object and have up to 6 attributes', user)
    )
  }

  /**
   * Add metaData
   * 新增 metaData
   *
   * @param section
   * @param data
   */
  addMetaData(section: string, data: any) {
    return addMetaData(this._metaData, section, data)
  }

  /**
   * Get metaData
   * 获取 metaData
   *
   * @param section
   */
  getMetaData(section: string) {
    return getMetaData(this._metaData, section)
  }

  /**
   * Delete metaData
   * 删除 metaData
   *
   * @param section
   */
  deleteMetaData(section: string) {
    return deleteMetaData(this._metaData, section)
  }
}
