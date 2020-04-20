import { CaptureCtx, Config, OhbugPlugin } from '@ohbug/types'
import init from '../src/init'
import { createOtherEvent } from '../src/createEvent'
import collect from '../src/collect'

const apiKey = 'test_id'
const config = { apiKey }
const platform = 'browser'
const pluginCapture1 = jest.fn()
const pluginCapture2 = jest.fn()
class plugin1 implements OhbugPlugin {
  capture(ctx: CaptureCtx) {
    return pluginCapture1(ctx)
  }
}
class plugin2 implements OhbugPlugin {
  config: Config
  constructor(config: Config) {
    this.config = config
  }
  capture(ctx: CaptureCtx) {
    return pluginCapture2(ctx, this.config)
  }
}
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
    expect(pluginCapture1).toBeCalled()
    expect(pluginCapture2).toBeCalled()
    const ctx = {
      createEvent: createOtherEvent,
      collect
    }
    expect(pluginCapture1.mock.calls[0][0]).toEqual(ctx)
    expect(pluginCapture2.mock.calls[0][0]).toEqual(ctx)
  })

  it('should can use config', () => {
    expect(pluginCapture2.mock.calls[0][1]).toEqual(config)
  })
})
