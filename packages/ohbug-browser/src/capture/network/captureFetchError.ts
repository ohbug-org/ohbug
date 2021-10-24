import { getGlobal, getOhbugObject, warning, replace } from '@ohbug/utils'
import { FETCH_ERROR } from '@ohbug/core'

import { networkDispatcher } from '../../dispatch'
import { FetchErrorDetail } from '../../handle'

const global = getGlobal<Window>()
const access = 'fetch' in global

let fetchOriginal = access ? global.fetch : null
/**
 * capture FETCH_ERROR
 */
export function captureFetchError() {
  warning(
    access,
    'Binding `fetch` monitoring failed, the current environment did not find the object `fetch`'
  )
  if (!access) return

  const { client } = getOhbugObject<Window>()

  fetchOriginal = replace(
    global,
    'fetch',
    (origin) =>
      function call(...args: any[]) {
        return origin.apply(this, args).then(
          (res: Response) => {
            const [url, conf] = args
            const detail: FetchErrorDetail = {
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
            client.addAction('fetch', detail, 'fetch')

            if (!res.status || res.status >= 400) {
              networkDispatcher(FETCH_ERROR, detail)
            }
            return res
          },
          (err: Error) => {
            const [url, conf] = args
            const detail: FetchErrorDetail = {
              req: {
                url,
                method: conf && conf.method,
                data: (conf && conf.body) || {},
              },
              res: {
                status: 400,
                statusText: 'unknownError',
              },
            }
            networkDispatcher(FETCH_ERROR, detail)
            throw err
          }
        )
      }
  )
}

export function removeCaptureFetchError() {
  if (access && fetchOriginal) {
    global.fetch = fetchOriginal
  }
}
