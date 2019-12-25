import { getGlobal, warning } from '@ohbug/utils'
import { version } from './version'
import { Config, defaultConfig } from './config'
import { Enhancer } from './enhancer'
import { Platform, Event } from './interface'

interface Init {
  config: Config
  platform: Platform
  handleCapture: () => void
  handleReport: (event: Event<any>) => void
  enhancer?: (config: Config) => Enhancer
}

/**
 * An init function common to multiple JavaScript platforms for saving config information and capture report middleware, etc.
 *
 * @param config Config information
 * @param platform Each issue will record its original platform
 * @param handleCapture Used to bind monitoring functions
 * @param handleReport Used to pass the report function
 * @param enhancer Used to pass the return value of the applyMiddleware function
 */
function init<T>({ config, platform, handleCapture, handleReport, enhancer }: Init) {
  const global = getGlobal<T>()
  warning(
    Boolean(global),
    `Ohbug: It is detected that the current environment does not support Ohbug.`
  )
  if (!global) return

  if (global.__OHBUG__ === undefined) {
    warning(Boolean(config.appid), `Ohbug: Please pass in appid!`)
    if (!config.appid) return

    const _config = {
      ...defaultConfig,
      ...config
    }

    global.__OHBUG__ = {
      platform,
      version,
      config: _config
    }

    // Insert middleware
    if (enhancer) {
      warning(
        typeof enhancer === 'function',
        '`enhancer` is not a function, please check `Ohbug.init`!'
      )
      if (typeof enhancer !== 'function') return
      const _enhancer = enhancer(_config)
      global.__OHBUG__.enhancer = _enhancer
    }
    global.__OHBUG__._report = handleReport
    handleCapture()
  }
}

export default init
