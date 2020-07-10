import { getGlobal } from '@ohbug/utils'
import {
  removeCaptureScript,
  removeCaptureNetwork,
  removeCaptureAction,
  removeCaptureConsole,
} from './capture'

const global = getGlobal<Window>()

export function handleDestroy() {
  global.addEventListener(
    'unload',
    () => {
      removeCaptureScript()
      removeCaptureNetwork()
      removeCaptureAction()
      removeCaptureConsole()
    },
    true
  )
}
