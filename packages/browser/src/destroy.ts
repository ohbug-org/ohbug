import { getGlobal } from '@ohbug/utils'
import {
  removeScriptCapturer,
  removeNetworkCapturer,
  removeActionCapturer,
  removeConsoleCapturer
} from './capturer'

const global = getGlobal<Window>()

export function handleDestroy() {
  removeScriptCapturer()
  removeNetworkCapturer()
  removeActionCapturer()
  removeConsoleCapturer()

  global.__OHBUG__ = null as any
}

function destroy() {
  global.addEventListener(
    'unload',
    () => {
      handleDestroy()
    },
    true
  )
}

export default destroy
