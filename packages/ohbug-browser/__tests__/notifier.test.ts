import { describe, expect, test, vi } from 'vitest'
import type { OhbugEventWithMethods } from '@ohbug/types'
import { BrowserClient } from '../src/client'
import { notifier } from '../src/notifier'

const mockSendBeacon = vi.fn()
const event = { type: 'test' } as OhbugEventWithMethods<any>
const apiKey = 'API_KEY_TEST'

describe('@ohbug/browser/client', () => {
  test('notify via `navigator.sendBeacon`', () => {
    BrowserClient.setup({ apiKey })
    navigator.sendBeacon = mockSendBeacon

    notifier(event)

    expect(mockSendBeacon).toBeCalledTimes(1)
  })
})
