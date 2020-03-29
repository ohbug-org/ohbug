import { Plugin } from '@ohbug/types'
import applyPlugin from '../src/applyPlugin'

const apiKey = 'test_id'
const config = { apiKey }
const pluginCapture1 = jest.fn()
const pluginCapture2 = jest.fn()
const pluginCollect = jest.fn()
const plugin1: Plugin = () => ({
  capture: pluginCapture1,
  collect: pluginCollect
})
const plugin2: Plugin = () => ({
  capture: pluginCapture2
})
const enhancer = applyPlugin(plugin1, plugin2)

describe('core applyPlugin', () => {
  it('should reduce the plugins', () => {
    expect(enhancer(config)).toEqual({
      captures: [pluginCapture1, pluginCapture2],
      collects: [pluginCollect]
    })
  })
})
