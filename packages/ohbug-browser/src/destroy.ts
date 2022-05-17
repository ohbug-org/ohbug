import { getGlobal } from '@ohbug/utils'
import {
  removeCaptureAction,
  removeCaptureConsole,
  removeCaptureNetwork,
  removeCaptureScript,
} from './capture'

const global = getGlobal<Window>()

export function handleDestroy() {
  global?.addEventListener?.(
    'unload',
    () => {
      removeCaptureScript()
      removeCaptureNetwork()
      removeCaptureAction()
      removeCaptureConsole()
    },
    true,
  )
}
