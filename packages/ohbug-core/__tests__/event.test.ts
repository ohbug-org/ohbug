import { describe, expect, test } from 'vitest'
import { Client } from '../src/client'
import { isEvent } from '../src/event'
import { getValues } from './utils'

describe('@ohbug/core/event', () => {
  describe('isEvent()', () => {
    test('should be return whether the specified data is event', () => {
      const client = new Client(getValues())
      const eventTrue = client.createEvent({
        category: 'error',
        type: 'exception',
        detail: 'should be return whether the specified data is event',
      })
      const eventFalse = 'should be return whether the specified data is event'
      expect(isEvent(eventTrue)).toBe(true)
      expect(isEvent(eventFalse)).toBe(false)
    })
  })
})
