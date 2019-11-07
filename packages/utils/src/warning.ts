export function warning(condition: boolean, format: string, ...args: any[]) {
  if (format === undefined) {
    throw new Error('`warning(condition, format, ...args)` requires a warning message argument')
  }

  if (!condition) {
    let argIndex = 0
    throw new Error(format.replace(/%s/g, () => args[argIndex++]))
  }
}
