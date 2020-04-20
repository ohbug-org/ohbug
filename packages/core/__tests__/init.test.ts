import { getGlobal } from '@ohbug/utils'
import init from '../src/init'
import type { OhbugPlugin } from '@ohbug/types'

const apiKey = 'test_id'
const config = { apiKey }
const platform = 'browser'
const handleReport = jest.fn()
const handleCapture = jest.fn()
const handleAsync = jest.fn()
class plugin implements OhbugPlugin {
  capture() {}
  state() {
    return {}
  }
}
const plugins = [plugin]

describe('core init', () => {
  beforeAll(() => {
    init({
      config,
      platform,
      handleCapture,
      handleReport,
      handleAsync,
      // @ts-ignore
      plugins,
    })
  })

  const global = getGlobal<Window>()

  it('the `__OHBUG__` object should be mounted on global', () => {
    expect(global.__OHBUG__).not.toBeUndefined()
  })

  it('the `enhancer` object should be mounted on `global.__OHBUG__`', () => {
    expect(global.__OHBUG__.enhancer).not.toBeUndefined()
  })

  it('the `_report` object should be mounted on `global.__OHBUG__`', () => {
    expect(global.__OHBUG__._report).not.toBeUndefined()
    expect(global.__OHBUG__._report).toEqual(handleReport)
  })

  it('should trigger handleCapture', () => {
    expect(handleCapture).toBeCalledTimes(1)
  })

  it('should trigger handleAsync', () => {
    expect(handleAsync).toBeCalledTimes(1)
  })
})
