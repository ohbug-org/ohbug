import { Config, init, Enhancer, capturer } from '@ohbug/core'
import { scriptCapturer, networkCapturer } from './capturer'
import handleReport from './report'

function handleCapture() {
  capturer(scriptCapturer, networkCapturer)
}

function initBrowser(config: Config, enhancer?: (config: Config) => Enhancer) {
  const platform = 'browser'
  init<Window>(config, platform, handleCapture, handleReport, enhancer)
}

export default initBrowser
