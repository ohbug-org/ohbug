import { getGlobal } from '@ohbug/utils'
import { removeReplaceAddEventListener } from './replaceAddEventListener'
import {
  removeCaptureAction,
  removeCaptureConsole,
  removeCaptureNetwork,
  removeCaptureScript,
} from './capture'

const global = getGlobal<Window>()

export function destroy() {
  removeReplaceAddEventListener()
  removeCaptureScript()
  removeCaptureNetwork()
  removeCaptureAction()
  removeCaptureConsole()
}

export function handleDestroy() {
  global?.addEventListener?.(
    'unload',
    () => {
      destroy()
    },
    true,
  )
}
