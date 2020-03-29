import { getGlobal } from '@ohbug/utils'
import { Plugin } from '@ohbug/types'
import init from '../src/init'
import collect from '../src/collect'
import { getEnhancer } from '../src/enhancer'
import { getHub } from '../src/hub'
jest.mock('../src/hub')

const apiKey = 'test_id'
const config = { apiKey }
const platform = 'browser'
const event = { type: 'test' }
const extra = 'hello'
const plugin: Plugin = () => ({
  collect() {
    return {
      extra
    }
  }
})
const plugins = [plugin]

describe('core collect', () => {
  afterEach(() => {
    // destroy
    const global = getGlobal()
    delete global.__OHBUG__
  })

  it('calls hub.addEvent with enhancer', () => {
    init({
      config,
      platform,
      handleCapture: () => {},
      handleReport: () => {},
      handleAsync: () => {},
      plugins
    })

    const mockAddEvent = jest.fn()
    ;(getHub as jest.Mock).mockImplementation(() => ({
      addEvent: mockAddEvent
    }))

    collect(event)

    const _enhancer = getEnhancer()
    if (_enhancer && Array.isArray(_enhancer.collects) && _enhancer.collects.length) {
      expect(mockAddEvent.mock.calls[0][0]).toEqual({ ...event, state: { extra } })
    }
  })

  it('calls hub.addEvent without enhancer', () => {
    init({
      config,
      platform,
      handleCapture: () => {},
      handleReport: () => {},
      handleAsync: () => {}
    })

    const mockAddEvent = jest.fn()
    ;(getHub as jest.Mock).mockImplementation(() => ({
      addEvent: mockAddEvent
    }))

    collect(event)

    const _enhancer = getEnhancer()
    if (!(_enhancer && Array.isArray(_enhancer.collects) && _enhancer.collects.length)) {
      expect(mockAddEvent.mock.calls[0][0]).toEqual(event)
    }
  })
})
