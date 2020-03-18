import { logger } from './logger'
const { NODE_ENV } = process.env

export function warning(condition: boolean, format: string, ...args: any[]) {
  if (NODE_ENV !== 'production') {
    if (format === undefined) {
      logger.error('`warning(condition, format, ...args)` requires a warning message argument')
      return
    }
  }

  if (!condition) {
    let argIndex = 0
    logger.error(format.replace(/%s/g, () => args[argIndex++]))
    return
  }
}
