import { Config, init, Enhancer, capturer } from '@ohbug/core'
import { scriptCapturer, networkCapturer, breadcrumbCapturer } from './capturer'
import handleReport from './report'
import handleAsync from './async'
import { version } from './version'

function handleCapture() {
  capturer<Window>(scriptCapturer, networkCapturer, breadcrumbCapturer)
}

function initBrowser(config: Config, enhancer?: (config: Config) => Enhancer) {
  const platform = 'browser'
  init<Window>({ config, platform, version, handleCapture, handleReport, handleAsync, enhancer })
}

export default initBrowser
