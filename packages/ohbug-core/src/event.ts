import type {
  OhbugAction,
  OhbugCategory,
  OhbugClient,
  OhbugCreateEvent,
  OhbugDevice,
  OhbugEvent,
  OhbugEventWithMethods,
  OhbugMetadata,
  OhbugReleaseStage,
  OhbugSDK,
  OhbugUser,
} from '@ohbug/types'

import { isFunction, isObject, isString } from '@ohbug/utils'
import { Action } from './action'
import { getErrorMessage } from './lib/getErrorMessage'
import { addMetadata, deleteMetadata, getMetadata } from './lib/metadata'

export class Event<D> implements OhbugEventWithMethods<D> {
  readonly apiKey: string

  readonly appVersion?: string

  readonly appType?: string

  readonly timestamp: string

  readonly category?: OhbugCategory

  readonly type: string

  readonly sdk: OhbugSDK

  readonly device: OhbugDevice

  readonly detail: D

  user?: OhbugUser

  readonly actions?: OhbugAction[]

  readonly metadata: OhbugMetadata

  readonly releaseStage?: OhbugReleaseStage

  readonly __client?: OhbugClient

  constructor(values: OhbugEvent<D>, client?: OhbugClient) {
    const {
      apiKey,
      appVersion,
      appType,
      releaseStage,
      timestamp,
      category,
      type,
      sdk,

      detail,
      device,
      user,
      actions,
      metadata,
    } = values
    this.apiKey = apiKey
    this.appVersion = appVersion
    this.appType = appType
    this.releaseStage = releaseStage
    this.timestamp = timestamp
    this.category = category
    this.type = type
    this.sdk = sdk

    this.detail = detail
    this.device = device
    this.user = user
    this.actions = actions
    this.metadata = metadata ?? {}

    this.__client = client
  }

  get __isOhbugEvent() {
    return true
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
    const actions = this.actions!

    const targetMessage = isString(message) ? message : ''
    const targetData = data || {}
    const targetType = isString(type) ? type : ''

    const action = new Action(targetMessage, targetData, targetType, timestamp)
    if (actions.length >= (this.__client?.__config.maxActions ?? 30)) { actions.shift() }

    actions.push(action)
  }

  /**
   * Get current user information
   * 获取当前的用户信息
   */
  getUser(): OhbugUser | undefined {
    return this.user
  }

  /**
   * Set current user information
   * 设置当前的用户信息
   */
  setUser(user: OhbugUser): OhbugUser | undefined {
    if (isObject(user) && Object.keys(user).length <= 6) {
      this.user = { ...this.user, ...user }
      return this.getUser()
    }
    this.__client?.__logger.error(getErrorMessage(
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
    return addMetadata(this.metadata, section, data)
  }

  /**
   * Get metadata
   * 获取 metadata
   *
   * @param section
   */
  getMetadata(section: string) {
    return getMetadata(this.metadata, section)
  }

  /**
   * Delete metadata
   * 删除 metadata
   *
   * @param section
   */
  deleteMetadata(section: string) {
    return deleteMetadata(this.metadata, section)
  }

  toJSON() {
    const {
      apiKey,
      appVersion,
      appType,
      timestamp,
      category,
      type,
      sdk,
      device,
      detail,
      user,
      actions,
      metadata,
      releaseStage,
    } = this
    return {
      apiKey,
      appVersion,
      appType,
      timestamp,
      category,
      type,
      sdk,
      device,
      detail,
      user,
      actions,
      metadata,
      releaseStage,
    }
  }
}

export function createEvent<D>(
  values: OhbugCreateEvent<D>,
  client: OhbugClient,
): OhbugEventWithMethods<D> {
  const { apiKey, appVersion, appType, releaseStage } = client.__config
  const timestamp = new Date().toISOString()
  const device = client.__device(client)
  let category: OhbugCategory
  let type: string
  let detail: D
  if (
    isObject(values)
    && Object.prototype.hasOwnProperty.call(values, 'type')
    && Object.prototype.hasOwnProperty.call(values, 'detail')
  ) {
    category = values.category || 'error'
    type = values.type
    detail = values.detail
  }
  else {
    category = 'error'
    type = 'unknownError'
    detail = values as unknown as D
  }

  return new Event(
    {
      apiKey,
      appVersion,
      appType,
      timestamp,
      category,
      type,
      sdk: client.__sdk,
      device,
      user: client.__user,
      detail,
      actions: client.__actions,
      metadata: client.__metadata,
      releaseStage,
    },
    client,
  )
}

export function handleEventCreated<D = any>(
  event: OhbugEventWithMethods<D>,
  client: OhbugClient,
): OhbugEventWithMethods<D> | null {
  const funcs = [
    client.__config.onEvent,
    ...client.__extensions.map(({ onEvent }) => onEvent),
  ].filter(v => isFunction(v)) as ((
    event: OhbugEventWithMethods<D>,
    client: OhbugClient
  ) => OhbugEventWithMethods<D> | null)[]
  if (funcs.length === 0) { return event }

  return funcs.reduce<OhbugEventWithMethods<D> | null>((previous, current) => {
    if (previous && isFunction(current)) { return current(previous, client) }

    return null
  }, event)
}

export function isEvent(eventLike: any): eventLike is OhbugEventWithMethods<any> {
  return Boolean(eventLike?.__isOhbugEvent)
}
