export function error(condition: boolean, format: string, ...args: any[]) {
  if (format === undefined)
    throw new Error('`Ohbug warning(condition, format, ...args)` requires a warning message argument')

  if (!condition) {
    let argIndex = 0
    const message = format.replace(/%s/g, () => args[argIndex++])
    throw new Error(`Ohbug ${message}`)
  }
}
