import { getGlobal } from '@ohbug/utils'
import { Config, Event, OhbugPlugin } from '@ohbug/types'
import init from '../src/init'
import collect from '../src/collect'
import { getHub } from '../src/hub'
jest.mock('../src/hub')

const apiKey = 'test_id'
const config = { apiKey }
const platform = 'browser'
const event = { type: 'test' }
const extra = 'hello'
class plugin1 implements OhbugPlugin {
  state() {
    return {
      extra
    }
  }
}
const pluginState = jest.fn()
const pluginEvent = jest.fn()
class plugin2 implements OhbugPlugin {
  config: Config
  constructor(config: Config) {
    this.config = config
  }
  state(event: Event<any>) {
    const { config } = this
    pluginState(event, config)
    return {
      extra
    }
  }
  event(event: Event<any>) {
    const { config } = this
    pluginEvent(event, config)
    return {
      ...event,
      plugin2: true
    }
  }
}
class plugin3 implements OhbugPlugin {
  event(event: Event<any>) {
    return {
      ...event,
      plugin3: true
    }
  }
}
const plugins = [plugin1, plugin2, plugin3]

describe('core collect', () => {
  afterEach(() => {
    // destroy
    const global = getGlobal()
    delete global.__OHBUG__
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

    expect(mockAddEvent.mock.calls[0][0]).toEqual(event)
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

    expect(mockAddEvent.mock.calls[0][0]).toEqual({
      ...event,
      plugin2: true,
      plugin3: true,
      state: {
        extra
      }
    })
  })

  it('should can use config', () => {
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

    expect(pluginState.mock.calls[0][1]).toEqual(config)
    expect(pluginEvent.mock.calls[0][1]).toEqual(config)
  })
})
