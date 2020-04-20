import init from '../src/init'
import { createOtherEvent } from '../src/createEvent'
import collect from '../src/collect'
import type { OhbugCaptureCtx, OhbugConfig, OhbugPlugin } from '@ohbug/types'

const apiKey = 'test_id'
const config = { apiKey }
const platform = 'browser'
const pluginCapture1 = jest.fn()
const pluginCapture2 = jest.fn()
class plugin1 implements OhbugPlugin {
  capture(ctx: OhbugCaptureCtx) {
    return pluginCapture1(ctx)
  }
}
class plugin2 implements OhbugPlugin {
  config: OhbugConfig
  constructor(config: OhbugConfig) {
    this.config = config
  }
  capture(ctx: OhbugCaptureCtx) {
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
      // @ts-ignore
      plugins,
    })
  })

  it('should execute all enhancer capture functions', () => {
    expect(pluginCapture1).toBeCalled()
    expect(pluginCapture2).toBeCalled()
    const ctx = {
      createEvent: createOtherEvent,
      collect,
    }
    expect(pluginCapture1.mock.calls[0][0]).toEqual(ctx)
    expect(pluginCapture2.mock.calls[0][0]).toEqual(ctx)
  })

  it('should can use config', () => {
    expect(pluginCapture2.mock.calls[0][1]).toEqual(config)
  })
})
