import { OhbugConfig, OhbugEvent } from '@ohbug/types'
import { isObject } from '@ohbug/utils'

import { Client } from '../src/client'
import { createExtension } from '../src/extension'
import { isEvent } from '../src/event'

const apiKey = 'API_KEY_TEST'
const getValues = (config?: OhbugConfig) => {
  config = config || { apiKey }
  return {
    config,
    device: {
      platform: 'jest',
      version: '0.0.0',
    },
    notifier: (event: OhbugEvent<any>) => event,
  }
}

describe('@ohbug/core/client', () => {
  describe('constructor', () => {
    const logger = {
      log: jest.fn(),
      warn: jest.fn(),
      info: jest.fn(),
      error: jest.fn(),
    }
    it('an exception should be thrown when entering wrong parameter', () => {
      // @ts-expect-error
      expect(() => new Client()).toThrow()
      const client = new Client(getValues({ apiKey: '', logger }))
      expect(client).toBeTruthy()
      expect(logger.warn).toBeCalledTimes(1)
    })
  })

  describe('use()', () => {
    it('should be support load extensions', () => {
      const client = new Client(getValues())
      const extension = createExtension({
        name: 'test_extension',
        init: (_client) => {
          expect(_client).toEqual(client)
        },
      })
      client.use(extension)
      expect(client._extensions).toEqual([extension])
    })
  })

  describe('createEvent()', () => {
    it('should be get an event', () => {
      const client = new Client(getValues())
      const event = client.createEvent({
        category: 'error',
        type: 'exception',
        detail: 'should be get an event',
      })
      expect(isEvent(event)).toBe(true)
      expect(event).toBeTruthy()
      expect(isObject(event)).toBe(true)
    })

    it('should be trigger all created hooks', () => {
      const hooks = {
        clientCreated: jest.fn(),
        extensionCreated: jest.fn(),
      }
      const client = new Client(getValues({ apiKey, created: hooks.clientCreated }))
      const extension = createExtension({
        name: 'test_extension',
        created: hooks.extensionCreated,
      })
      client.use(extension)

      client.createEvent({
        category: 'error',
        type: 'exception',
        detail: 'should be trigger all created hooks',
      })

      expect(hooks.clientCreated).toBeCalledTimes(1)
      expect(hooks.extensionCreated).toBeCalledTimes(1)
    })
  })

  describe('notify()', () => {
    it('')
  })
})
