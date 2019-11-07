import { getGlobal, warning } from '@ohbug/utils'
import { version } from './version'
import { Config, defaultConfig } from './config'
import { Enhancer } from './enhancer'
import { Platform, WrappedIssue } from './interface'

function init<T>(
  config: Config,
  platform: Platform,
  handleCapture: () => void,
  handleReport: (issues: WrappedIssue<any>[]) => void,
  enhancer?: (config: Config) => Enhancer
) {
  const global = getGlobal<T>()
  warning(Boolean(global), `Ohbug: 检测到当前环境不支持Ohbug。`)
  if (!global) return

  if (global) {
    if (global.__OHBUG__ === undefined) {
      warning(Boolean(config.appid), `Ohbug: 请传入 appid !`)
      if (!config.appid) return

      global.__OHBUG__ = {
        platform,
        version
      }
      init(config, platform, handleCapture, handleReport, enhancer)
    } else {
      global.__OHBUG__.auth = true
      let _c: Config
      global.__OHBUG__.config = _c = {
        ...defaultConfig,
        ...config
      }

      if (global.__OHBUG__.auth) {
        // 插入 middleware
        if (enhancer) {
          warning(typeof enhancer === 'function', '`enhancer` 不是一个函数，请检查 `Ohbug.init`')
          if (typeof enhancer !== 'function') return
          const _enhancer = enhancer(_c)
          global.__OHBUG__.enhancer = _enhancer
        }
        global.__OHBUG__._report = handleReport
        handleCapture()
      }
    }
  }
}

export default init
