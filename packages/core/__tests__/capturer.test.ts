import init from '../src/init'
import capturer from '../src/capturer'
import applyMiddleware from '../src/applyMiddleware'

const appid = 'test_id'
const config = { appid }
const platform = 'browser'
const middlewareCapturer1 = jest.fn()
const middlewareCapturer2 = jest.fn()
const middleware1 = () => ({
  capturer: middlewareCapturer1
})
const middleware2 = () => ({
  capturer: middlewareCapturer2
})
const enhancer = applyMiddleware(middleware1, middleware2)

describe('core capturer', () => {
  beforeAll(() => {
    init({ config, platform, handleCapture: () => {}, handleReport: () => {}, enhancer })
  })

  it('should execute all capture functions', () => {
    const capture1 = jest.fn()
    const capture2 = jest.fn()
    capturer(capture1, capture2)
    expect(capture1).toBeCalledTimes(1)
    expect(capture2).toBeCalledTimes(1)
  })

  it('should execute all enhancer capture functions', () => {
    capturer()
    expect(middlewareCapturer1).toBeCalled()
    expect(middlewareCapturer2).toBeCalled()
  })
})
