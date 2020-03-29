import { Plugin } from '@ohbug/types'
import init from '../src/init'
import { getEnhancer } from '../src/enhancer'
import { createOtherEvent } from '../src/createEvent'
import collect from '../src/collect'

const apiKey = 'test_id'
const config = { apiKey }
const platform = 'browser'
const pluginCapture1 = jest.fn()
const pluginCapture2 = jest.fn()
const plugin1: Plugin = () => ({
  capture: pluginCapture1
})
const plugin2: Plugin = () => ({
  capture: pluginCapture2
})
const plugins = [plugin1, plugin2]

describe('core capture', () => {
  beforeAll(() => {
    init({
      config,
      platform,
      handleCapture: () => {},
      handleReport: () => {},
      handleAsync: () => {},
      plugins
    })
  })

  it('should execute all enhancer capture functions', () => {
    const enhancer = getEnhancer()
    if (enhancer) {
      const { captures: EnhanceCaptures } = enhancer
      if (Array.isArray(EnhanceCaptures) && EnhanceCaptures.length) {
        expect(pluginCapture1).toBeCalled()
        expect(pluginCapture2).toBeCalled()
        const ctx = {
          createEvent: createOtherEvent,
          collect
        }
        expect(pluginCapture1.mock.calls[0][0]).toEqual(ctx)
        expect(pluginCapture2.mock.calls[0][0]).toEqual(ctx)
      }
    }
  })
})
