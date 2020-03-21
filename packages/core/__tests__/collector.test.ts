import { getGlobal } from '@ohbug/utils'
import { Plugin } from '@ohbug/types'
import applyPlugin from '../src/applyPlugin'
import init from '../src/init'
import collector from '../src/collector'
import { getEnhancer } from '../src/enhancer'
import { getHub } from '../src/hub'
jest.mock('../src/hub')

const apiKey = 'test_id'
const config = { apiKey }
const platform = 'browser'
const event = { type: 'test' }
const extra = 'hello'
const plugin: Plugin = () => ({
  collector() {
    return {
      extra
    }
  }
})
const enhancer = applyPlugin(plugin)

describe('core collector', () => {
  afterEach(() => {
    // destroy
    const global = getGlobal()
    delete global.__OHBUG__
  })

  it('calls hub.addEvent with enhancer', () => {
    init({
      config,
      platform,
      version: 'test',
      handleCapture: () => {},
      handleReport: () => {},
      handleAsync: () => {},
      enhancer
    })

    const mockAddEvent = jest.fn()
    ;(getHub as jest.Mock).mockImplementation(() => ({
      addEvent: mockAddEvent
    }))

    collector(event)

    const _enhancer = getEnhancer()
    if (_enhancer && Array.isArray(_enhancer.collectors) && _enhancer.collectors.length) {
      expect(mockAddEvent.mock.calls[0][0]).toEqual({ ...event, state: { extra } })
    }
  })

  it('calls hub.addEvent without enhancer', () => {
    init({
      config,
      platform,
      version: 'test',
      handleCapture: () => {},
      handleReport: () => {},
      handleAsync: () => {}
    })

    const mockAddEvent = jest.fn()
    ;(getHub as jest.Mock).mockImplementation(() => ({
      addEvent: mockAddEvent
    }))

    collector(event)

    const _enhancer = getEnhancer()
    if (!(_enhancer && Array.isArray(_enhancer.collectors) && _enhancer.collectors.length)) {
      expect(mockAddEvent.mock.calls[0][0]).toEqual(event)
    }
  })
})
