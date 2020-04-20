import { getGlobal } from '@ohbug/utils'
import {
  removeCaptureScript,
  removeCaptureNetwork,
  removeCaptureAction,
  removeCaptureConsole,
} from './capture'

const global = getGlobal<Window>()

export function handleDestroy() {
  removeCaptureScript()
  removeCaptureNetwork()
  removeCaptureAction()
  removeCaptureConsole()

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
