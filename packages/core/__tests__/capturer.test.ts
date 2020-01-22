import init from '../src/init'
import capturer from '../src/capturer'
import applyPlugin from '../src/applyPlugin'

const appid = 'test_id'
const config = { appid }
const platform = 'browser'
const pluginCapturer1 = jest.fn()
const pluginCapturer2 = jest.fn()
const plugin1 = () => ({
  capturer: pluginCapturer1
})
const plugin2 = () => ({
  capturer: pluginCapturer2
})
const enhancer = applyPlugin(plugin1, plugin2)

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
    expect(pluginCapturer1).toBeCalled()
    expect(pluginCapturer2).toBeCalled()
  })
})
