import { getGlobal } from '@ohbug/utils'
import { removeScriptCapturer } from './capturer/scriptCapturer'
import { removeNetworkCapturer } from './capturer/networkCapturer'
import { removeActionCapturer } from './capturer/actionCapturer'

function destroy() {
  const global = getGlobal<Window>()
  global.addEventListener(
    'unload',
    () => {
      removeScriptCapturer()
      removeNetworkCapturer()
      removeActionCapturer()
    },
    true
  )
}

export default destroy
