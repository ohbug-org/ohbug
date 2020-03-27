import { Config, OhbugObject } from '@ohbug/types'
import { getGlobal, error } from '@ohbug/utils'

export const defaultConfig: Config = {
  apiKey: ''
}

export function getOhbugObject<T>(): OhbugObject {
  const global = getGlobal<T>()
  error(Boolean(global.__OHBUG__), 'Failed to get `OhbugObject`, please confirm if `init`')

  return global.__OHBUG__
}

export function getConfig<T>(): Config {
  const { config } = getOhbugObject<T>()
  return config as Config
}
