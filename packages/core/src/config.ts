import { getGlobal, warning } from '@ohbug/utils'
import { Event, OhbugObject } from './interface'

export interface Config {
  apiKey: string
  appVersion?: string
  appType?: string
  beforeReport?: (event: Event<any>) => Event<any>
  reported?: (event: Event<any>) => void
}

export const defaultConfig: Config = {
  apiKey: ''
}

export function getOhbugObject<T>(): OhbugObject {
  const global = getGlobal<T>()
  warning(Boolean(global.__OHBUG__), 'Failed to get `OhbugObject`, please confirm if `init`')

  return global.__OHBUG__ as OhbugObject
}

export function getConfig<T>(): Config {
  const config = (getOhbugObject<T>() as OhbugObject).config
  warning(Boolean(config), 'Failed to get `__Ohbug__.config`, please confirm if `init`')

  return config as Config
}
