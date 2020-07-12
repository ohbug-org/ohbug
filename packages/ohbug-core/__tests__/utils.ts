import { OhbugConfig, OhbugEventWithMethods } from '@ohbug/types'

export const apiKey = 'API_KEY_TEST'
export const device = {
  platform: 'jest',
  version: '0.0.0',
}
export const getValues = (config?: OhbugConfig) => {
  config = config || { apiKey }
  return {
    config,
    device,
    notifier: (event: OhbugEventWithMethods<any>) => event,
  }
}
