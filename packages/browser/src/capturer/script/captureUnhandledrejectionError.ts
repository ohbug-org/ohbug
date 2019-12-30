import { getGlobal } from '@ohbug/utils'
import { scriptDispatcher } from '../../dispatcher'

const global = getGlobal<Window>()

/**
 * capture UNHANDLEDREJECTION_ERROR
 */
function captureUnhandledrejectionError() {
  global.addEventListener(
    'unhandledrejection',
    e => {
      scriptDispatcher(e)
    },
    true
  )
}

export default captureUnhandledrejectionError
