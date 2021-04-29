import { getGlobal } from '../src/get'

describe('@ohbug/utils/get', () => {
  it('should return the global object', () => {
    const global = getGlobal()
    expect(global).toEqual(window)
  })
})
