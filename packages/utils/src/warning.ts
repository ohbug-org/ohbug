const { NODE_ENV } = process.env

export function warning(condition: boolean, format: string, ...args: any[]) {
  if (NODE_ENV !== 'production') {
    if (format === undefined) {
      throw new Error('`warning(condition, format, ...args)` requires a warning message argument')
    }
  }

  if (!condition) {
    let argIndex = 0
    throw new Error(format.replace(/%s/g, () => args[argIndex++]))
  }
}
