import { Queue } from '@ohbug/utils'
import { Event } from '@ohbug/types'
import init from '../src/init'
import { getOhbugObject } from '../src/config'
import collector from '../src/collector'

const apiKey = 'test_id'
const mockBeforeReport = jest.fn(e => e)
const mockReported = jest.fn()
const config = {
  apiKey,
  beforeReport(event: Event<any>) {
    return mockBeforeReport(event)
  },
  reported(event: Event<any>) {
    mockReported(event)
  }
}
const platform = 'browser'
const handleReport = jest.fn()
const mockAsyncFn = jest.fn()
const timeout = 100
const handleAsync = () => {
  const ohbugObject = getOhbugObject()
  const queue = new Queue()
  ohbugObject._asyncQueue = queue
  setTimeout(() => {
    mockAsyncFn()
  }, timeout)
}
const event = { type: 'test' } as Event<any>

describe('core report', () => {
  beforeAll(() => {
    init({
      config,
      platform,
      version: 'test',
      handleCapture: () => {},
      handleReport,
      handleAsync
    })

    collector(event)
  })

  it('calls config.beforeReport()', () => {
    expect(mockBeforeReport).toBeCalled()
  })

  it('calls config.reported()', () => {
    expect(mockReported).toBeCalled()
  })

  it('calls report with sync', () => {
    expect(handleReport).toBeCalled()
  })

  it('calls report with async', done => {
    collector(event, 'async')
    const ohbugObject = getOhbugObject()
    expect(ohbugObject._asyncQueue?.get()[0]).toEqual(event)

    setTimeout(() => {
      expect(mockAsyncFn).toBeCalledTimes(1)
      done()
    }, timeout)
  })
})
