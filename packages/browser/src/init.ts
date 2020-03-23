import { init, capturer } from '@ohbug/core'
import { Config, Enhancer } from '@ohbug/types'
import { scriptCapturer, networkCapturer, actionCapturer } from './capturer'
import handleReport from './report'
import handleAsync from './async'
import handleDestroy from './destroy'

function handleCapture() {
  capturer<Window>(scriptCapturer, networkCapturer, actionCapturer)
}

function initBrowser(config: Config, enhancer?: (config: Config) => Enhancer) {
  const platform = 'browser'
  init<Window>({
    config,
    platform,
    handleCapture,
    handleReport,
    handleAsync,
    handleDestroy,
    enhancer
  })
}

export default initBrowser
