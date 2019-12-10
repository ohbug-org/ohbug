import { getGlobal, warning } from '@ohbug/utils'
import { Event, OhbugObject } from './interface'

export interface Config {
  appid: string
  // 最大上传错误数量
  maxEvent?: number
  // 错误处理间隔时间
  delay?: number
  // 通常用于处理上传的数据
  beforeReport?: (issues: Event<any>[]) => Event<any>[] | []
  // 上传后回调
  reported?: (issues: Event<any>[]) => void
}

export const defaultConfig: Config = {
  appid: '',
  maxEvent: 10,
  delay: 2000
}

export function getOhbugObject<T>(): OhbugObject {
  const global = getGlobal<T>()
  warning(Boolean(global.__OHBUG__), 'Failed to get `OhbugObject`, please confirm if `init`')

  return global.__OHBUG__ as OhbugObject
}

export function getConfig<T>(): Config {
  const config = (getOhbugObject<T>() as OhbugObject).config
  warning(Boolean(config), 'Failed to get `__Ohbug__.config`, please confirm if `init`')

  return config as Config
}
