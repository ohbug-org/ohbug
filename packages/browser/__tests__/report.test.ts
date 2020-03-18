import { Event } from '@ohbug/types'
import initBrowser from '../src/init'
import report from '../src/report'

const apiKey = 'test_id'
const config = { apiKey }
const mockSendBeacon = jest.fn()
const event = { type: 'test' } as Event<any>

describe('browser report', () => {
  beforeAll(() => {
    initBrowser(config)
  })

  it('report via `navigator.sendBeacon`', () => {
    navigator.sendBeacon = mockSendBeacon

    report(event)

    expect(mockSendBeacon).toBeCalledTimes(1)
  })
})
