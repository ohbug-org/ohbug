import { isFunction, isNumber, isObject, isString, logger } from '@ohbug/utils'
import type { OhbugEventWithMethods, OhbugSchema } from '@ohbug/types'

export const schema: OhbugSchema = {
  // base
  apiKey: {
    defaultValue: undefined,
    message: 'is required',
    validate: value => Boolean(value) && isString(value),
  },
  appVersion: {
    defaultValue: undefined,
    message: 'should be a string',
    validate: value => value === undefined || isString(value),
  },
  appType: {
    defaultValue: undefined,
    message: 'should be a string',
    validate: value => value === undefined || isString(value),
  },
  releaseStage: {
    defaultValue: 'production',
    message: 'should be a string',
    validate: value => value === undefined || isString(value),
  },
  endpoint: {
    defaultValue: 'http://localhost:6660',
    message: 'should be a string',
    validate: value => value === undefined || isString(value),
  },
  maxActions: {
    defaultValue: 30,
    message: 'should be a number between 0 and 100',
    validate: value =>
      value === undefined || (isNumber(value) && value >= 0 && value <= 100),
  },
  // hooks
  onEvent: {
    defaultValue: (event: OhbugEventWithMethods<any>) => event,
    message: 'should be a function',
    validate: value => value === undefined || isFunction(value),
  },
  onNotify: {
    defaultValue: () => {},
    message: 'should be a function',
    validate: value => value === undefined || isFunction(value),
  },
  // utils
  logger: {
    defaultValue: logger,
    message:
      'should be null or an object with methods { log, info, warn, error }',
    validate: value =>
      value === undefined
      || (value
        && ['log', 'info', 'warn', 'error'].reduce<boolean>(
          (accumulator, method) =>
            accumulator && typeof value[method] === 'function',
          true,
        )),
  },
  // data
  user: {
    defaultValue: undefined,
    message: 'should be an object and have up to 6 attributes',
    validate: value =>
      value === undefined
      || (isObject(value) && Object.keys(value).length <= 6),
  },
  metadata: {
    defaultValue: undefined,
    message: 'should be an object',
    validate: value => value === undefined || isObject(value),
  },
}
