import type { OhbugExtension } from './extension'
import type { OhbugConfig, OhbugLoggerConfig, OhbugSchema } from './config'
import type { OhbugCreateEvent, OhbugEventWithMethods, OhbugSDK } from './event'
import type { OhbugGetDevice } from './device'
import type { OhbugNotifier } from './notify'
import type { OhbugAction } from './action'
import type { OhbugUser } from './user'
import type { OhbugMetaData } from './metaData'

export interface OhbugClientConstructorValues {
  sdk: OhbugSDK
  config: OhbugConfig
  schema?: OhbugSchema
  device: OhbugGetDevice
  notifier: OhbugNotifier
}
export interface OhbugClientConstructor {
  new (values: OhbugClientConstructorValues): OhbugClient
}

export interface OhbugClient {
  readonly __sdk: OhbugSDK
  readonly __config: OhbugConfig
  readonly __logger: OhbugLoggerConfig
  readonly __device: OhbugGetDevice
  readonly __notifier: OhbugNotifier

  readonly __extensions: OhbugExtension[]

  readonly __actions: OhbugAction[]
  __user: OhbugUser
  readonly __metaData: OhbugMetaData

  use: (extension: OhbugExtension) => OhbugClient
  createEvent: <D = any>(
    value: OhbugCreateEvent<D>
  ) => OhbugEventWithMethods<D> | null
  notify: <D = any>(
    eventLike: any,
    beforeNotify?: (
      event: OhbugEventWithMethods<D> | null
    ) => OhbugEventWithMethods<D> | null
  ) => Promise<any | null>
  addAction: (
    message: string,
    data: Record<string, any>,
    type: string,
    timestamp?: string
  ) => void
  getUser: () => OhbugUser | undefined
  setUser: (user: OhbugUser) => OhbugUser | undefined
  addMetaData: (section: string, data: any) => any
  getMetaData: (section: string) => any
  deleteMetaData: (section: string) => any
}
