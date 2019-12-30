import { getGlobal } from '@ohbug/utils'
import { scriptDispatcher } from '../../dispatcher'

const global = getGlobal<Window>()

/**
 * capture UNCAUGHT_ERROR RESOURCE_ERROR
 */
function captureUncaughtError() {
  global.addEventListener(
    'error',
    e => {
      scriptDispatcher(e)
    },
    true
  )
}

export default captureUncaughtError
