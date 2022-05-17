import { describe, expect, test, vi } from 'vitest'
import type { OhbugMetaData, OhbugUser } from '@ohbug/types'
import { isObject, isPromise } from '@ohbug/utils'

import { Client } from '../src/client'
import { defineExtension } from '../src/extension'
import { isEvent } from '../src/event'
import { Action } from '../src/action'
import { apiKey, getValues } from './utils'

describe('@ohbug/core/client', () => {
  describe('constructor', () => {
    const logger = {
      log: vi.fn(),
      warn: vi.fn(),
      info: vi.fn(),
      error: vi.fn(),
    }
    test('an exception should be thrown when entering wrong parameter', () => {
      // @ts-expect-error no apiKey
      expect(() => new Client()).toThrow()
      const client = new Client(getValues({ apiKey: '', logger }))
      expect(client).toBeTruthy()
      expect(logger.warn).toBeCalledTimes(1)
    })
  })

  describe('use()', () => {
    test('should be support load extensions', () => {
      const client = new Client(getValues())
      const extension = defineExtension({
        name: 'test_extension',
        setup: (_client) => {
          expect(_client).toEqual(client)
        },
      })
      client.use(extension)
      expect(client.__extensions).toEqual([extension])
    })
  })

  describe('createEvent()', () => {
    test('should be get an event', () => {
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

    test('should be trigger all onEvent hooks', () => {
      const hooks = {
        clientOnEvent: vi.fn(e => e),
        extensionOnEvent: vi.fn(e => e),
      }
      const client = new Client(getValues({ apiKey, onEvent: hooks.clientOnEvent }))
      const extension = defineExtension({
        name: 'test_extension',
        onEvent: hooks.extensionOnEvent,
      })
      client.use(extension)

      client.createEvent({
        category: 'error',
        type: 'exception',
        detail: 'should be trigger all onEvent hooks',
      })

      expect(hooks.clientOnEvent).toBeCalledTimes(1)
      expect(hooks.extensionOnEvent).toBeCalledTimes(1)
    })
  })

  describe('notify()', () => {
    test('should be return a promise', () => {
      const client = new Client(getValues())
      const result = client.notify('should be return a promise')
      expect(isPromise(result)).toBe(true)
    })

    test('should be called beforeNotify', () => {
      const beforeNotify = vi.fn()
      const client = new Client(getValues())
      client.notify('should be package events', beforeNotify)
      expect(beforeNotify).toBeCalledTimes(1)
    })

    test('should be package events', () => {
      const client = new Client(getValues())
      client.notify('should be package events', (event) => {
        expect(isEvent(event)).toBe(true)
        return event
      })
    })

    test('should be trigger all onNotify hooks', async() => {
      const hooks = {
        clientNotified: vi.fn(),
        extensionNotified: vi.fn(),
      }
      const client = new Client(getValues({ apiKey, onNotify: hooks.clientNotified }))
      const extension = defineExtension({
        name: 'test_extension',
        onNotify: hooks.extensionNotified,
      })
      client.use(extension)

      const event = client.createEvent({
        category: 'error',
        type: 'exception',
        detail: 'should be trigger all onNotify hooks',
      })
      await client.notify(event)

      expect(hooks.clientNotified).toBeCalledTimes(1)
      expect(hooks.extensionNotified).toBeCalledTimes(1)
    })
  })

  describe('addAction()', () => {
    test('action should be added to actions correctly', () => {
      const client = new Client(getValues())
      const now = new Date().toISOString()
      const action = {
        message: 'action should be added to actions correctly',
        data: { a: 1 },
        type: 'test',
        timestamp: now,
      }
      expect(client.__actions.length).toBe(0)
      client.addAction(
        action.message,
        action.data,
        action.type,
        action.timestamp,
      )
      expect(client.__actions.length).toBe(1)
      expect(client.__actions[0]).toEqual(new Action(action.message, action.data, action.type, action.timestamp))
    })

    test('once the threshold is reached, delete the oldest breadcrumbs', () => {
      const maxActions = 5
      const client = new Client(getValues({ apiKey, maxActions }))
      const now = new Date().toISOString()
      const action = {
        message: 'once the threshold is reached, delete the oldest breadcrumbs',
        type: 'test',
        timestamp: now,
      }
      expect(client.__actions.length).toBe(0)
      for (let i = 1; i <= maxActions; i += 1) {
        client.addAction(
          action.message,
          { index: i },
          action.type,
          action.timestamp,
        )
      }
      expect(client.__actions.length).toBe(maxActions)
      expect(client.__actions[client.__actions.length - 1])
        .toEqual(new Action(action.message, { index: 5 }, action.type, action.timestamp))
      client.addAction(
        action.message,
        { index: 6 },
        action.type,
        action.timestamp,
      )
      expect(client.__actions[0]).toEqual(new Action(action.message, { index: 2 }, action.type, action.timestamp))
      expect(client.__actions[client.__actions.length - 1])
        .toEqual(new Action(action.message, { index: 6 }, action.type, action.timestamp))
    })
  })

  describe('user', () => {
    test('should be get the user information correctly', () => {
      const user: OhbugUser = {
        id: 1,
        name: 'yueban',
        email: 'yueban@ohbug.net',
      }
      const client = new Client(getValues({ apiKey, user }))
      expect(client.getUser()).toEqual(user)
    })

    test('should be set the user information correctly', () => {
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
    test('should be set the metaData correctly', () => {
      const metaData: OhbugMetaData = {
        organization: {
          name: 'ohbug',
          platform: 'test',
        },
      }
      const client = new Client(getValues({
        apiKey,
        metaData,
      }))
      expect(client.__metaData.organization).toEqual(metaData.organization)
    })

    test('should be add the metaData correctly', () => {
      const metaData: OhbugMetaData = {
        organization: {
          name: 'ohbug',
          platform: 'test',
        },
      }
      const client = new Client(getValues())
      client.addMetaData('organization', {
        name: 'ohbug',
        platform: 'test',
      })
      expect(client.__metaData.organization).toEqual(metaData.organization)
    })

    test('should be get the metaData correctly', () => {
      const metaData: OhbugMetaData = {
        organization: {
          name: 'ohbug',
          platform: 'test',
        },
      }
      const client = new Client(getValues())
      client.addMetaData('organization', {
        name: 'ohbug',
        platform: 'test',
      })
      expect(client.getMetaData('organization')).toEqual(metaData.organization)
    })

    test('should be delete the metaData correctly', () => {
      const metaData: OhbugMetaData = {
        organization: {
          name: 'ohbug',
          platform: 'test',
        },
      }
      const client = new Client(getValues({ apiKey, metaData }))
      client.deleteMetaData('organization')
      expect(client.getMetaData('organization')).toBeUndefined()
      expect(Object.keys(client.__metaData).length).toBe(0)
    })
  })
})
