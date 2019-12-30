import { getGlobal } from '../src/get'

describe('utils get', () => {
  it('should return the global object', () => {
    const _global = getGlobal()
    expect(_global).toEqual(window)
  })
})
