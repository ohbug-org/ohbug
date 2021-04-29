import { getOhbugObject, error } from '@ohbug/utils'
import type { Middleware, Action, MiddlewareAPI } from 'redux'

const identity = (action: Action) => action

type CreateOhbugMiddlewareOption = (
  action: Action,
  store: MiddlewareAPI
) => Action | false
export const createOhbugMiddleware = (
  before: CreateOhbugMiddlewareOption = identity
): Middleware => (store) => (next) => (action) => {
  const data = before(action, store)

  if (data) {
    const ohbugObject = getOhbugObject<Window>()
    error(Boolean(ohbugObject), '`Ohbug.init` is not running yet!')

    ohbugObject.client.addAction(
      'dispatch a redux action',
      data,
      'redux-action'
    )
  }

  return next(action)
}
