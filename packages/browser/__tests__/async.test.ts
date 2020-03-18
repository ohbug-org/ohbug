import { getOhbugObject } from '@ohbug/core'
import { Queue } from '@ohbug/utils'
import initBrowser from '../src/init'

const apiKey = 'test_id'
const config = { apiKey }

describe('browser async', () => {
  beforeAll(() => {
    initBrowser(config)
  })

  it('ohbugObject._asyncQueue should not be undefined', () => {
    const ohbugObject = getOhbugObject()
    const queue = new Queue()

    expect(ohbugObject._asyncQueue).not.toBeUndefined()
    expect(ohbugObject._asyncQueue).toEqual(queue)
  })
})
