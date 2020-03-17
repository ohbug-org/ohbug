import init from '../src/init'
import capturer from '../src/capturer'
import applyPlugin from '../src/applyPlugin'
import { getEnhancer } from '../src/enhancer'
import { createOtherEvent } from '../src/createEvent'
import collector from '../src/collector'

const apiKey = 'test_id'
const config = { apiKey }
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
    init({
      config,
      platform,
      version: 'test',
      handleCapture: () => {},
      handleReport: () => {},
      handleAsync: () => {},
      enhancer
    })
  })

  it('should execute all capture functions', () => {
    const capture1 = jest.fn()
    const capture2 = jest.fn()
    capturer(capture1, capture2)
    expect(capture1).toBeCalledTimes(1)
    expect(capture2).toBeCalledTimes(1)
  })

  it('should execute all enhancer capture functions', () => {
    const enhancer = getEnhancer()
    if (enhancer) {
      const { capturers: EnhanceCapturers } = enhancer
      if (Array.isArray(EnhanceCapturers) && EnhanceCapturers.length) {
        expect(pluginCapturer1).toBeCalled()
        expect(pluginCapturer2).toBeCalled()
        const ctx = {
          createEvent: createOtherEvent,
          collector
        }
        expect(pluginCapturer1.mock.calls[0][0]).toEqual(ctx)
        expect(pluginCapturer2.mock.calls[0][0]).toEqual(ctx)
      }
    }
  })
})
