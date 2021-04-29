import { OhbugLoggerConfig } from '@ohbug/types'

const prefix = 'Ohbug'

export const logger: OhbugLoggerConfig = {
  log(...args: any[]) {
    // eslint-disable-next-line no-console
    console.log(prefix, ...args)
  },

  info(...args: any[]) {
    // eslint-disable-next-line no-console
    console.info(prefix, ...args)
  },

  warn(...args: any[]) {
    console.warn(prefix, ...args)
  },

  error(...args: any[]) {
    console.error(prefix, ...args)
  },
}
