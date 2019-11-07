import { getGlobal } from '../src/global'

describe('utils global', () => {
  it('should return the global object', () => {
    const _global = getGlobal()
    expect(_global).toEqual(window)
  })
})
