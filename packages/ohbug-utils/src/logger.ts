/* eslint-disable no-console */
import type { OhbugLoggerConfig } from '@ohbug/types'

export const logger: OhbugLoggerConfig = {
  log(...args: any[]) {
    console.log(...args)
  },

  info(...args: any[]) {
    console.info(...args)
  },

  warn(...args: any[]) {
    console.warn(...args)
  },

  error(...args: any[]) {
    console.error(...args)
  },
}
