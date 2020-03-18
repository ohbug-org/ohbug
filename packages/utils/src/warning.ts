import { logger } from './logger'
const { NODE_ENV } = process.env

export function warning(condition: boolean, format: string, ...args: any[]) {
  if (NODE_ENV !== 'production') {
    if (format === undefined) {
      throw new Error('`warning(condition, format, ...args)` requires a warning message argument')
    }

    if (!condition) {
      let argIndex = 0
      const message = format.replace(/%s/g, () => args[argIndex++])
      logger.error(message)
      try {
        throw new Error(message)
      } catch (x) {} // eslint-disable-line
      return
    }
  }
}
