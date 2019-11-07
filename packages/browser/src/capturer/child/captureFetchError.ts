import { getGlobal, warning, replace } from '@ohbug/utils'
import { types } from '@ohbug/core'
import { networkDispatcher } from '../../dispatcher'

const global = getGlobal<Window>()
const { FETCH_ERROR } = types

/**
 * 用于捕获 FETCH_ERROR
 */
function captureFetchError() {
  warning('fetch' in global, 'Ohbug: 绑定 `fetch` 监控失败，当前环境未发现对象 `fetch`')
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
              networkDispatcher(FETCH_ERROR, {
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
