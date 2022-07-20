import type {
  OhbugAction,
  OhbugClient,
  OhbugClientConstructor,
  OhbugClientConstructorValues,
  OhbugConfig,
  OhbugCreateEvent,
  OhbugEventWithMethods,
  OhbugExtension,
  OhbugGetDevice,
  OhbugLoggerConfig,
  OhbugMetadata,
  OhbugNotifier,
  OhbugSDK,
  OhbugUser,
} from '@ohbug/types'
import { isObject, isString } from '@ohbug/utils'

import { schema as baseSchema } from './config'
import { createEvent, handleEventCreated, isEvent } from './event'
import { notify } from './notify'
import { Action } from './action'
import { verifyConfig } from './lib/verifyConfig'
import { getConfigErrorMessage, getErrorMessage } from './lib/getErrorMessage'
import { addMetadata, deleteMetadata, getMetadata } from './lib/metadata'

export const Client: OhbugClientConstructor = class Client
implements OhbugClient {
  readonly __sdk: OhbugSDK

  readonly __config: OhbugConfig

  readonly __logger: OhbugLoggerConfig

  readonly __device: OhbugGetDevice

  readonly __notifier: OhbugNotifier

  readonly __extensions: OhbugExtension[]

  readonly __actions: OhbugAction[]

  __user: OhbugUser

  readonly __metadata: OhbugMetadata

  constructor({
    sdk,
    config: baseConfig,
    schema = baseSchema,
    device,
    notifier,
  }: OhbugClientConstructorValues) {
    const { config, errors } = verifyConfig(baseConfig, schema)

    // initialization
    this.__sdk = sdk
    this.__config = config
    this.__logger = config.logger
    this.__device = device
    this.__notifier = notifier

    this.__extensions = []

    this.__actions = []
    this.__user = config.user
    this.__metadata = {}
    if (isObject(config.metadata)) {
      Object.keys(config.metadata).forEach((key) => {
        this.addMetadata(key, config.metadata[key])
      })
    }

    if (Object.keys(errors).length) {
      this.__logger.warn(getConfigErrorMessage(errors, baseConfig))
    }
  }

  /**
   * Load extension
   * 加载扩展
   *
   * @param extension
   */
  use(extension: OhbugExtension): OhbugClient {
    this.__extensions.push(extension)
    extension.onSetup?.(this)
    return this
  }

  /**
   * Create an event, you will get a data body containing device actions and other information
   * 创建事件，将会得到一个含有 device actions 等信息的数据体
   *
   * @param value
   */
  createEvent<D = any>(value: OhbugCreateEvent<D>): OhbugEventWithMethods<D> | null {
    const event = createEvent(value, this)

    return handleEventCreated(event, this)
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
    beforeNotify?: (
      event: OhbugEventWithMethods<D> | null
    ) => OhbugEventWithMethods<D> | null,
  ): Promise<any | null> {
    let event: OhbugEventWithMethods<D> | null
    if (Boolean(eventLike) && !isEvent(eventLike)) { event = this.createEvent(eventLike) }
    else { event = eventLike }

    if (beforeNotify) event = beforeNotify(event)

    return notify<D>(event, this)
  }

  /**
   * Add an action.
   * Once the threshold is reached, the oldest breadcrumbs will be deleted.
   * 新增一个动作。
   * 一旦达到阈值，最老的 Action 将被删除。
   *
   * @param message
   * @param data
   * @param type
   * @param timestamp
   */
  addAction(
    message: string,
    data: Record<string, any>,
    type: string,
    timestamp?: string,
  ): void {
    const actions = this.__actions

    const targetMessage = isString(message) ? message : ''
    const targetData = data || {}
    const targetType = isString(type) ? type : ''

    const action = new Action(targetMessage, targetData, targetType, timestamp)
    if (actions.length >= this.__config.maxActions!) { actions.shift() }

    actions.push(action)
  }

  /**
   * Get current user information
   * 获取当前的用户信息
   */
  getUser(): OhbugUser | undefined {
    return this.__user
  }

  /**
   * Set current user information
   * 设置当前的用户信息
   */
  setUser(user: OhbugUser): OhbugUser | undefined {
    if (isObject(user) && Object.keys(user).length <= 6) {
      this.__user = { ...this.__user, ...user }
      return this.getUser()
    }
    this.__logger.warn(getErrorMessage(
      'setUser should be an object and have up to 6 attributes',
      user,
    ))
    return undefined
  }

  /**
   * Add metadata
   * 新增 metadata
   *
   * @param section
   * @param data
   */
  addMetadata(section: string, data: any) {
    return addMetadata(this.__metadata, section, data)
  }

  /**
   * Get metadata
   * 获取 metadata
   *
   * @param section
   */
  getMetadata(section: string) {
    return getMetadata(this.__metadata, section)
  }

  /**
   * Delete metadata
   * 删除 metadata
   *
   * @param section
   */
  deleteMetadata(section: string) {
    return deleteMetadata(this.__metadata, section)
  }
}
