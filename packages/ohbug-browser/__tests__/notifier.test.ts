import type { OhbugEvent } from '@ohbug/types'
import { notifier } from '../src/notifier'

const mockSendBeacon = jest.fn()
const event = { type: 'test' } as OhbugEvent<any>

describe('@ohbug/browser/client', () => {
  it('notify via `navigator.sendBeacon`', () => {
    navigator.sendBeacon = mockSendBeacon

    notifier(event)

    expect(mockSendBeacon).toBeCalledTimes(1)
  })
})
