export function isString(value: any): value is string {
  return typeof value === 'string'
}

export function isNumber(value: any): value is number {
  return typeof value === 'number' && parseInt(`${value}`, 10) === value
}

export function isFunction(value: any): value is Function {
  return typeof value === 'function'
}

export function isObject(value: any): value is Object {
  return Object.prototype.toString.call(value) === '[object Object]'
}

export function isPromise(value: any): value is Promise<any> {
  return value instanceof Promise
}
