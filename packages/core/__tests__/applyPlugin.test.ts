import { OhbugPlugin, Event, CaptureCtx } from '@ohbug/types'
import applyPlugin from '../src/applyPlugin'

const apiKey = 'test_id'
const config = { apiKey }
const pluginCapture1 = jest.fn()
const pluginCapture2 = jest.fn()
const pluginState = jest.fn()
class plugin1 implements OhbugPlugin {
  capture(ctx: CaptureCtx) {
    return pluginCapture1(ctx)
  }
  state(event: Event<any>) {
    return pluginState(event)
  }
}
class plugin2 implements OhbugPlugin {
  capture(ctx: CaptureCtx) {
    return pluginCapture2(ctx)
  }
}
const plugins = [plugin1, plugin2]
// @ts-ignore
const enhancer = applyPlugin(plugins)

describe('core applyPlugin', () => {
  it('should reduce the plugins', () => {
    // @ts-ignore
    expect(enhancer(config)).toEqual(plugins.map(Plugin => new Plugin(config)))
  })
})
