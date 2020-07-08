export function isString(value: any): value is string {
  return typeof value === 'string' && Boolean(value.length)
}

export function isFunction(value: any): value is Function {
  return typeof value === 'function'
}
