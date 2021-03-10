import { getGlobal } from '@ohbug/utils'
import {
  removeCaptureScript,
  removeCaptureNetwork,
  removeCaptureAction,
  removeCaptureConsole,
} from './capture'

const _global = getGlobal<Window>()

export function handleDestroy() {
  _global?.addEventListener?.(
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
