import { BrowserClient } from '../src/client'
import type { OhbugEventWithMethods } from '@ohbug/types'
import { notifier } from '../src/notifier'

const mockSendBeacon = jest.fn()
const event = { type: 'test' } as OhbugEventWithMethods<any>
const apiKey = 'API_KEY_TEST'

describe('@ohbug/browser/client', () => {
  it('notify via `navigator.sendBeacon`', () => {
    BrowserClient.init({ apiKey })
    navigator.sendBeacon = mockSendBeacon

    notifier(event)

    expect(mockSendBeacon).toBeCalledTimes(1)
  })
})
