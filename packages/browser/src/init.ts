import { init } from '@ohbug/core'
import { Config, Plugin } from '@ohbug/types'
import handleCapture from './capture'
import handleReport from './report'
import handleAsync from './async'
import handleDestroy from './destroy'

function initBrowser(config: Config, plugins?: Plugin[]) {
  const platform = 'browser'
  init<Window>({
    config,
    platform,
    handleCapture,
    handleReport,
    handleAsync,
    handleDestroy,
    plugins
  })
}

export default initBrowser
