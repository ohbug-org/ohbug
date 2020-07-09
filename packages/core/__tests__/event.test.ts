import { Client } from '../src/client'
import { getValues } from './utils'
import { isEvent } from '../src/event'

describe('@ohbug/core/event', () => {
  describe('isEvent()', () => {
    it('should be return whether the specified data is event', () => {
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
