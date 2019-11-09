import { getGlobal, warning } from '@ohbug/utils'
import { WrappedIssue, OhbugObject } from './interface'

export interface Config {
  appid: string
  // 最大上传错误数量
  maxIssue?: number
  // 错误处理间隔时间
  delay?: number
  // 通常用于处理上传的数据
  beforeReport?: (issues: WrappedIssue<any>[]) => WrappedIssue<any>[] | []
  // 上传后回调
  reported?: (issues: WrappedIssue<any>[]) => void
}

export const defaultConfig: Config = {
  appid: '',
  maxIssue: 10,
  delay: 2000
}

export function getOhbugObject<T>(): OhbugObject {
  const global = getGlobal<T>()
  warning(Boolean(global.__OHBUG__), 'Failed to get `OhbugObject`, please confirm if `init`')

  return global.__OHBUG__
}

export function getConfig<T>(): Config {
  const config = (getOhbugObject<T>() as OhbugObject).config
  warning(Boolean(config), 'Failed to get `__Ohbug__.config`, please confirm if `init`')

  return config as Config
}
