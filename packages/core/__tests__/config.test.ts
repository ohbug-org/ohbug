import { getGlobal } from '@ohbug/utils'
import init from '../src/init'
import { getOhbugObject, getConfig } from '../src/config'

const apiKey = 'test_id'
const config = { apiKey }
const platform = 'browser'

describe('core config', () => {
  beforeAll(() => {
    init({
      config,
      platform,
      version: 'test',
      handleCapture: () => {},
      handleReport: () => {},
      handleAsync: () => {}
    })
  })

  const global = getGlobal()

  it('calls getOhbugObject()', () => {
    const ohbugObject = getOhbugObject()
    expect(ohbugObject).toEqual(global.__OHBUG__)
  })

  it('calls getConfig()', () => {
    const config = getConfig()
    expect(config).toEqual(global.__OHBUG__.config)
  })
})
