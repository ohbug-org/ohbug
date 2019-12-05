import { getGlobal, warning, replace } from '@ohbug/utils'
import { types } from '@ohbug/core'
import { networkDispatcher } from '../../dispatcher'

const global = getGlobal<Window>()
const { FETCH_ERROR } = types

/**
 * capture FETCH_ERROR
 */
function captureFetchError() {
  warning(
    'fetch' in global,
    'Ohbug: Binding `fetch` monitoring failed, the current environment did not find the object `fetch`'
  )
  if (!('fetch' in global)) return

  replace(
    global,
    'fetch',
    origin =>
      function(...args: any[]) {
        return origin
          .apply(this, args)
          .then((res: Response) => {
            const [url, conf] = args
            if (!res.status || res.status >= 400) {
              const message = `${FETCH_ERROR}: req { url: ${url}, method: ${conf &&
                conf.method} }, res { status: ${res.status}, statusText: ${res.statusText} }`
              networkDispatcher(FETCH_ERROR, {
                message,
                req: {
                  url,
                  method: conf && conf.method,
                  data: (conf && conf.body) || {}
                },
                res: {
                  status: res.status,
                  statusText: res.statusText
                }
              })
            }
            return res
          })
          .catch((err: Error) => {
            networkDispatcher(FETCH_ERROR, err)
          })
      }
  )
}

export default captureFetchError
