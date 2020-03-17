import { getGlobal } from '@ohbug/utils'
import init from '../src/init'
import { getEnhancer } from '../src/enhancer'

const apiKey = 'test_id'
const config = { apiKey }
const platform = 'browser'

describe('core enhancer', () => {
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
    const enhancer = getEnhancer()
    expect(enhancer).toEqual(global.__OHBUG__.enhancer)
  })
})
