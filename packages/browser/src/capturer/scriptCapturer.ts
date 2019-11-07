import { getGlobal, warning } from '@ohbug/utils'

import captureUncaughtError from './child/captureUncaughtError'
import captureUnhandledrejectionError from './child/captureUnhandledrejectionError'

const global = getGlobal<Window>()

function scriptCapturer() {
  warning(
    Boolean(global.addEventListener),
    'Ohbug: 绑定脚本监控失败，当前环境未发现对象 `addEventListener`'
  )
  if (!global.addEventListener) return

  // @ts-ignore
  if (global.addEventListener) {
    captureUncaughtError()
    captureUnhandledrejectionError()
  }
}

export default scriptCapturer
