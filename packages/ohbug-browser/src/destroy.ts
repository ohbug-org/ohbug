import { getGlobal } from '@ohbug/utils'
import { removeReplaceAddEventListener } from './replaceAddEventListener'
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
      removeReplaceAddEventListener()
      removeCaptureScript()
      removeCaptureNetwork()
      removeCaptureAction()
      removeCaptureConsole()
    },
    true,
  )
}
