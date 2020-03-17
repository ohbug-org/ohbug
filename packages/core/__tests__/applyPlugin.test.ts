import applyPlugin from '../src/applyPlugin'

const apiKey = 'test_id'
const config = { apiKey }
const pluginCapturer1 = jest.fn()
const pluginCapturer2 = jest.fn()
const pluginCollector = jest.fn()
const plugin1 = () => ({
  capturer: pluginCapturer1,
  collector: pluginCollector
})
const plugin2 = () => ({
  capturer: pluginCapturer2
})
const enhancer = applyPlugin(plugin1, plugin2)

describe('core applyPlugin', () => {
  it('should reduce the plugins', () => {
    expect(enhancer(config)).toEqual({
      capturers: [pluginCapturer1, pluginCapturer2],
      collectors: [pluginCollector]
    })
  })
})
