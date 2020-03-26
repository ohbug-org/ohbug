import { getHub } from '@ohbug/core'
import { getGlobal, warning } from '@ohbug/utils'
import { Middleware, Action, MiddlewareAPI } from 'redux'

const identity = (action: Action, _: MiddlewareAPI) => action

type CreateOhbugMiddlewareOption = (action: Action, store: MiddlewareAPI) => Action | false
const createOhbugMiddleware = (
  before: CreateOhbugMiddlewareOption = identity
): Middleware => store => next => action => {
  const data = before(action, store)

  if (data) {
    const global = getGlobal<Window>()
    warning(Boolean(global.__OHBUG__), '`Ohbug.init` is not running yet!')
    if (!global.__OHBUG__) return

    const hub = getHub<Window>()

    const timestamp = new Date().getTime()
    hub.addAction({
      type: 'redux-action',
      timestamp,
      data
    })
  }

  return next(action)
}

export default createOhbugMiddleware
