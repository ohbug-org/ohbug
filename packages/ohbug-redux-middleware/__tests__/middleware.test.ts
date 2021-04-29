import { createStore, applyMiddleware } from 'redux'
import type { Action } from 'redux'

import Ohbug from '@ohbug/browser'

import { createOhbugMiddleware } from '../src/middleware'

const apiKey = 'API_KEY_TEST'

const defaultState = 0
function counter(state = defaultState, action: Action) {
  switch (action.type) {
    case 'INCREMENT':
      return state + 1
    case 'DECREMENT':
      return state - 1
    default:
      return state
  }
}

describe('@ohbug/redux-middleware', () => {
  it('should works', () => {
    const client = Ohbug.init({ apiKey })
    const store = createStore(counter, applyMiddleware(createOhbugMiddleware()))

    store.dispatch({ type: 'INCREMENT' })
    store.dispatch({ type: 'INCREMENT' })
    store.dispatch({ type: 'DECREMENT' })

    const actions = client._actions

    expect(store.getState()).toBe(1)
    expect(actions.length).toBe(3)
  })

  it('action.data should be what is returned before', () => {
    function before(action: Action) {
      return {
        ...action,
        type: `[ohbug] ${action.type}`,
      }
    }
    const client = Ohbug.init({ apiKey })
    const store = createStore(
      counter,
      applyMiddleware(createOhbugMiddleware(before))
    )

    store.dispatch({ type: 'INCREMENT' })

    const actions = client._actions

    expect(store.getState()).toBe(1)
    expect(actions[actions.length - 1]?.data?.type).toBe('[ohbug] INCREMENT')
  })

  it('no action is added when before returns false', () => {
    function before(): false {
      return false
    }
    const client = Ohbug.init({ apiKey })
    const store = createStore(
      counter,
      applyMiddleware(createOhbugMiddleware(before))
    )

    const beforeLength = client._actions.length

    store.dispatch({ type: 'INCREMENT' })

    const afterLength = client._actions.length

    expect(store.getState()).toBe(1)
    expect(beforeLength).toBe(afterLength)
  })
})
