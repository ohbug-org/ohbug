import { getGlobal } from '@ohbug/utils'
import {
  removeScriptCapturer,
  removeNetworkCapturer,
  removeActionCapturer,
  removeConsoleCapturer
} from './capturer'

function destroy() {
  const global = getGlobal<Window>()
  global.addEventListener(
    'unload',
    () => {
      removeScriptCapturer()
      removeNetworkCapturer()
      removeActionCapturer()
      removeConsoleCapturer()
    },
    true
  )
}

export default destroy
