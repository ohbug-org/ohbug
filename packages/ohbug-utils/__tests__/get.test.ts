import { describe, expect, test } from 'vitest'
import { getGlobal } from '../src/get'

describe('@ohbug/utils/get', () => {
  test('should return the global object', () => {
    const global = getGlobal()
    expect(global).toEqual(window)
  })
})
