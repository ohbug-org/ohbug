import { init } from '@ohbug/core'
import handleCapture from './capture'
import handleReport from './report'
import handleAsync from './async'
import handleDestroy from './destroy'
import type { OhbugConfig, OhbugPlugin } from '@ohbug/types'

function initBrowser(config: OhbugConfig, plugins?: OhbugPlugin[]) {
  const platform = 'browser'
  init<Window>({
    config,
    platform,
    handleCapture,
    handleReport,
    handleAsync,
    handleDestroy,
    plugins,
  })
}

export default initBrowser
