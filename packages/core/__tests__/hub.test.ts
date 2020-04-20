import init from '../src/init'
import { getHub } from '../src/hub'
import { getOhbugObject } from '../src/config'
import report from '../src/report'
import type { OhbugEvent, OhbugAction } from '@ohbug/types'
jest.mock('../src/report')

const apiKey = 'test_id'
const config = { apiKey }
const platform = 'browser'
const event = {
  type: 'test',
} as OhbugEvent<any>
const action = { type: 'a' } as OhbugAction

describe('core hub', () => {
  beforeAll(() => {
    init({
      config,
      platform,
      handleCapture: () => {},
      handleReport: () => {},
      handleAsync: () => {},
    })
  })

  it('getHub() should return `ohbugObject.hub`', () => {
    const ohbugObject = getOhbugObject()

    const target = getHub()

    expect(target).toEqual(ohbugObject.hub)
  })

  it('hub.addEvent() should trigger the report', () => {
    const mockReport = jest.fn()
    ;(report as jest.Mock).mockImplementation(() => {
      mockReport()
    })
    const hub = getHub()

    hub.addEvent(event, 'sync')

    // @ts-ignore
    expect(hub.events).toEqual([event])
    expect(mockReport).toBeCalled()
  })

  it('hub.getActions() should return actions', () => {
    const hub = getHub()

    // @ts-ignore
    expect(hub.getActions()).toEqual(hub.actions)
  })

  it('hub.addActions() should return actions', () => {
    const hub = getHub()

    hub.addAction(action)

    // @ts-ignore
    expect(hub.getActions()).toEqual([action])
  })
})
