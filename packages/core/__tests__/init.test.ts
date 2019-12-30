import init from '../src/init'
import applyMiddleware from '../src/applyMiddleware'

const appid = 'test_id'
const config = { appid }
const platform = 'browser'
const handleCapture = jest.fn()
function middleware() {
  function capturer() {}
  function collector() {}
  return {
    capturer,
    collector
  }
}
const enhancer = applyMiddleware(middleware)

describe('core init', () => {
  beforeAll(() => {
    init({
      config,
      platform,
      handleCapture,
      handleReport: () => {},
      enhancer
    })
  })

  it('the `__OHBUG__` object should be mounted on global', () => {
    expect(window.__OHBUG__).not.toBeUndefined()
  })

  it('the `enhancer` object should be mounted on `global.__OHBUG__`', () => {
    expect(window.__OHBUG__.enhancer).not.toBeUndefined()
  })

  it('should trigger handleCapture', () => {
    expect(handleCapture).toBeCalledTimes(1)
  })
})
