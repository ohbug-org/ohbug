import { isString, isFunction, getGlobal, error } from '@ohbug/utils'
import type { OhbugConfig, OhbugSchema, OhbugObject, OhbugEvent } from '@ohbug/types'

export const schema: OhbugSchema = {
  // base
  apiKey: {
    defaultValue: undefined,
    message: 'is required',
    validate: isString,
  },
  appVersion: {
    defaultValue: undefined,
    message: 'should be a string',
    validate: (value: any) => value === undefined || isString(value),
  },
  appType: {
    defaultValue: undefined,
    message: 'should be a string',
    validate: (value: any) => value === undefined || isString(value),
  },
  // hooks
  created: {
    defaultValue: (event: OhbugEvent<any>) => event,
    message: 'should be a function',
    validate: isFunction,
  },
  notified: {
    defaultValue: () => {},
    message: 'should be a function',
    validate: isFunction,
  },
  // utils
  logger: {
    defaultValue: undefined,
    message: 'should be null or an object with methods { log, info, warn, error }',
    validate: (value) =>
      !value ||
      (value &&
        ['log', 'info', 'warn', 'error'].reduce(
          (accumulator, method) => accumulator && typeof value[method] === 'function',
          true
        )),
  },
}

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
