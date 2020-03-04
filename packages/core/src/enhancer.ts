import { getOhbugObject } from './config'

export function getEnhancer<T>() {
  return getOhbugObject<T>().enhancer
}
