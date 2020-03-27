import { createStore, applyMiddleware, Action } from 'redux'
import { init as initBrowser } from '@ohbug/browser'
import { getHub } from '@ohbug/core'
import createOhbugMiddleware from '../src'

const apiKey = 'test_id'
const config = { apiKey }

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

describe('redux-middleware', () => {
  beforeAll(() => {
    initBrowser(config)
  })

  it('should works', () => {
    const store = createStore(counter, applyMiddleware(createOhbugMiddleware()))

    store.dispatch({ type: 'INCREMENT' })
    store.dispatch({ type: 'INCREMENT' })
    store.dispatch({ type: 'DECREMENT' })

    const hub = getHub<Window>()
    const actions = hub.getActions()

    expect(store.getState()).toBe(1)
    expect(actions.length).toBe(3)
  })

  it('action.data should be what is returned before', () => {
    function before(action: Action) {
      return {
        ...action,
        type: `[ohbug] ${action.type}`
      }
    }
    const store = createStore(counter, applyMiddleware(createOhbugMiddleware(before)))

    store.dispatch({ type: 'INCREMENT' })

    const hub = getHub<Window>()
    const actions = hub.getActions()

    expect(store.getState()).toBe(1)
    expect(actions[actions.length - 1]?.data?.type).toBe('[ohbug] INCREMENT')
  })

  it('no action is added when before returns false', () => {
    function before(): false {
      return false
    }
    const store = createStore(counter, applyMiddleware(createOhbugMiddleware(before)))

    const hub = getHub<Window>()
    const _beforeLength = hub.getActions().length

    store.dispatch({ type: 'INCREMENT' })

    const _afterLength = hub.getActions().length

    expect(store.getState()).toBe(1)
    expect(_beforeLength).toBe(_afterLength)
  })
})
