import { getGlobal, error } from '@ohbug/utils'
import type { OhbugConfig, OhbugObject } from '@ohbug/types'

export const defaultConfig: OhbugConfig = {
  apiKey: '',
}

export function getOhbugObject<T>(): OhbugObject {
  const global = getGlobal<T>()
  error(Boolean(global.__OHBUG__), 'Failed to get `OhbugObject`, please confirm if `init`')

  return global.__OHBUG__
}

export function getConfig<T>(): OhbugConfig {
  const { config } = getOhbugObject<T>()
  return config as OhbugConfig
}
