import { getGlobal } from '@ohbug/utils'
import { WrappedIssue } from './interface'

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
  // 收集指定用户的特定信息
  include?: () => boolean
}

export const defaultConfig: Config = {
  appid: '',
  maxIssue: 10,
  delay: 2000
}

export function getConfig<T>(): Config {
  const global = getGlobal<T>()
  return global.__OHBUG__ ? global.__OHBUG__.config! : defaultConfig
}
