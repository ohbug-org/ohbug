import {
  OhbugConfig,
  OhbugEventWithMethods,
  OhbugGetDevice,
} from '@ohbug/types'

export const apiKey = 'API_KEY_TEST'
export const sdk = {
  platform: 'jest',
  version: '0.0.0',
}
export const getDevice: OhbugGetDevice = () => ({})
export const getValues = (config?: OhbugConfig) => {
  config = config || { apiKey }
  return {
    sdk,
    config,
    device: getDevice,
    notifier: (event: OhbugEventWithMethods<any>) => event,
  }
}
