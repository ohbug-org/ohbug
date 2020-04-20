import { getGlobal, warning, replace } from '@ohbug/utils'
import { types, getHub } from '@ohbug/core'
import { networkDispatcher } from '../../dispatch'

const global = getGlobal<Window>()
const { FETCH_ERROR } = types
const access = 'fetch' in global

let fetchOriginal = access ? global.fetch : null
/**
 * capture FETCH_ERROR
 */
function captureFetchError() {
  warning(
    access,
    'Ohbug: Binding `fetch` monitoring failed, the current environment did not find the object `fetch`'
  )
  if (!access) return

  const hub = getHub<Window>()

  fetchOriginal = replace(
    global,
    'fetch',
    (origin) =>
      function (...args: any[]) {
        return origin
          .apply(this, args)
          .then((res: Response) => {
            const [url, conf] = args
            const data = {
              req: {
                url,
                method: conf && conf.method,
                data: (conf && conf.body) || {},
              },
              res: {
                status: res.status,
                statusText: res.statusText,
              },
            }
            const timestamp = new Date().getTime()
            hub.addAction({
              type: 'fetch',
              timestamp,
              data,
            })

            if (!res.status || res.status >= 400) {
              networkDispatcher(FETCH_ERROR, data)
            }
            return res
          })
          .catch((err: Error) => {
            networkDispatcher(FETCH_ERROR, err)
          })
      }
  )
}

export function removeCaptureFetchError() {
  if (access && fetchOriginal) {
    global.fetch = fetchOriginal
  }
}

export default captureFetchError
