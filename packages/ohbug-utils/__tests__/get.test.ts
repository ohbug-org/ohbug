import { getGlobal } from '../src/get'

describe('@ohbug/utils/get', () => {
  it('should return the global object', () => {
    const _global = getGlobal()
    expect(_global).toEqual(window)
  })
})
