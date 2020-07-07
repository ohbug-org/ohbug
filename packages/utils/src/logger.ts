import { OhbugLoggerConfig } from '@ohbug/types'

const prefix = 'Ohbug'

export const logger: OhbugLoggerConfig = {
  log(...args: any[]) {
    console.log(prefix, ...args)
  },

  info(...args: any[]) {
    console.info(prefix, ...args)
  },

  warn(...args: any[]) {
    console.warn(prefix, ...args)
  },

  error(...args: any[]) {
    console.error(prefix, ...args)
  },
}
