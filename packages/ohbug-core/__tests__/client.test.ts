import type { OhbugMetaData, OhbugUser } from '@ohbug/types'
import { isObject, isPromise } from '@ohbug/utils'

import { apiKey, getValues } from './utils'
import { Client } from '../src/client'
import { createExtension } from '../src/extension'
import { isEvent } from '../src/event'
import { Action } from '../src/action'

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
      const client = new Client(
        getValues({ apiKey, created: hooks.clientCreated })
      )
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
    it('should be return a promise', () => {
      const client = new Client(getValues())
      const result = client.notify('should be return a promise')
      expect(isPromise(result)).toBe(true)
    })

    it('should be called beforeNotify', () => {
      const beforeNotify = jest.fn()
      const client = new Client(getValues())
      client.notify('should be package events', beforeNotify)
      expect(beforeNotify).toBeCalledTimes(1)
    })

    it('should be package events', () => {
      const client = new Client(getValues())
      client.notify('should be package events', (event) => {
        expect(isEvent(event)).toBe(true)
        return event
      })
    })

    it('should be trigger all notified hooks', async () => {
      const hooks = {
        clientNotified: jest.fn(),
        extensionNotified: jest.fn(),
      }
      const client = new Client(
        getValues({ apiKey, notified: hooks.clientNotified })
      )
      const extension = createExtension({
        name: 'test_extension',
        notified: hooks.extensionNotified,
      })
      client.use(extension)

      const event = client.createEvent({
        category: 'error',
        type: 'exception',
        detail: 'should be trigger all notified hooks',
      })
      await client.notify(event)

      expect(hooks.clientNotified).toBeCalledTimes(1)
      expect(hooks.extensionNotified).toBeCalledTimes(1)
    })
  })

  describe('addAction()', () => {
    it('action should be added to actions correctly', () => {
      const client = new Client(getValues())
      const now = new Date().toISOString()
      const action = {
        message: 'action should be added to actions correctly',
        data: { a: 1 },
        type: 'jest',
        timestamp: now,
      }
      expect(client._actions.length).toBe(0)
      client.addAction(
        action.message,
        action.data,
        action.type,
        action.timestamp
      )
      expect(client._actions.length).toBe(1)
      expect(client._actions[0]).toEqual(
        new Action(action.message, action.data, action.type, action.timestamp)
      )
    })

    it('once the threshold is reached, delete the oldest breadcrumbs', () => {
      const maxActions = 5
      const client = new Client(getValues({ apiKey, maxActions }))
      const now = new Date().toISOString()
      const action = {
        message: 'once the threshold is reached, delete the oldest breadcrumbs',
        type: 'jest',
        timestamp: now,
      }
      expect(client._actions.length).toBe(0)
      for (let i = 1; i <= maxActions; i += 1) {
        client.addAction(
          action.message,
          { index: i },
          action.type,
          action.timestamp
        )
      }
      expect(client._actions.length).toBe(maxActions)
      expect(client._actions[client._actions.length - 1]).toEqual(
        new Action(action.message, { index: 5 }, action.type, action.timestamp)
      )
      client.addAction(
        action.message,
        { index: 6 },
        action.type,
        action.timestamp
      )
      expect(client._actions[0]).toEqual(
        new Action(action.message, { index: 2 }, action.type, action.timestamp)
      )
      expect(client._actions[client._actions.length - 1]).toEqual(
        new Action(action.message, { index: 6 }, action.type, action.timestamp)
      )
    })
  })

  describe('user', () => {
    it('should be get the user information correctly', () => {
      const user: OhbugUser = {
        id: 1,
        name: 'yueban',
        email: 'yueban@ohbug.net',
      }
      const client = new Client(getValues({ apiKey, user }))
      expect(client.getUser()).toEqual(user)
    })

    it('should be set the user information correctly', () => {
      const user: OhbugUser = {
        id: 1,
        name: 'yueban',
        email: 'yueban@ohbug.net',
      }
      const user2: OhbugUser = {
        id: 2,
        name: 'yueban2',
        email: 'yueban@ohbug.net',
      }
      const client = new Client(getValues({ apiKey, user }))
      expect(client.setUser(user2)).toEqual(user2)
      expect(client.getUser()).toEqual(user2)
    })
  })

  describe('metaData', () => {
    it('should be set the metaData correctly', () => {
      const metaData: OhbugMetaData = {
        organization: {
          name: 'ohbug',
          platform: 'jest',
        },
      }
      const client = new Client(
        getValues({
          apiKey,
          metaData,
        })
      )
      expect(client._metaData.organization).toEqual(metaData.organization)
    })

    it('should be add the metaData correctly', () => {
      const metaData: OhbugMetaData = {
        organization: {
          name: 'ohbug',
          platform: 'jest',
        },
      }
      const client = new Client(getValues())
      client.addMetaData('organization', {
        name: 'ohbug',
        platform: 'jest',
      })
      expect(client._metaData.organization).toEqual(metaData.organization)
    })

    it('should be get the metaData correctly', () => {
      const metaData: OhbugMetaData = {
        organization: {
          name: 'ohbug',
          platform: 'jest',
        },
      }
      const client = new Client(getValues())
      client.addMetaData('organization', {
        name: 'ohbug',
        platform: 'jest',
      })
      expect(client.getMetaData('organization')).toEqual(metaData.organization)
    })

    it('should be delete the metaData correctly', () => {
      const metaData: OhbugMetaData = {
        organization: {
          name: 'ohbug',
          platform: 'jest',
        },
      }
      const client = new Client(getValues({ apiKey, metaData }))
      client.deleteMetaData('organization')
      expect(client.getMetaData('organization')).toBeUndefined()
      expect(Object.keys(client._metaData).length).toBe(0)
    })
  })
})
