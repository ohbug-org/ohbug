import { Queue } from '@ohbug/utils'
import { OhbugEvent } from '@ohbug/types'
import init from '../src/init'
import { getOhbugObject } from '../src/config'
import collect from '../src/collect'

const apiKey = 'test_id'
const mockBeforeReport = jest.fn(e => e)
const mockReported = jest.fn()
const config = {
  apiKey,
  beforeReport(event: OhbugEvent<any>) {
    return mockBeforeReport(event)
  },
  reported(event: OhbugEvent<any>) {
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
const event = { type: 'test' } as OhbugEvent<any>

describe('core report', () => {
  beforeAll(() => {
    init({
      config,
      platform,
      handleCapture: () => {},
      handleReport,
      handleAsync
    })

    collect(event)
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
    collect(event, 'async')
    const ohbugObject = getOhbugObject()
    expect(ohbugObject._asyncQueue?.get()[0]).toEqual(event)

    setTimeout(() => {
      expect(mockAsyncFn).toBeCalledTimes(1)
      done()
    }, timeout)
  })
})
