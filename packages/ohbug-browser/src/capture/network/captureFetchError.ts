import { getGlobal, getOhbugObject, warning, replace } from '@ohbug/utils'

import * as types from '../../types'
import { networkDispatcher } from '../../dispatch'
import { FetchErrorDetail } from '../../handle'

const _global = getGlobal<Window>()
const { FETCH_ERROR } = types
const access = 'fetch' in _global

let fetchOriginal = access ? _global.fetch : null
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
    _global,
    'fetch',
    (origin) =>
      function (...args: any[]) {
        return (
          origin
            // @ts-ignore
            .apply(this, args)
            .then((res: Response) => {
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
            })
            .catch((err: Error) => {
              networkDispatcher(FETCH_ERROR, err)
            })
        )
      }
  )
}

export function removeCaptureFetchError() {
  if (access && fetchOriginal) {
    _global.fetch = fetchOriginal
  }
}
