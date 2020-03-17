import init from '../src/init'
import { getHub } from '../src/hub'
import { getOhbugObject } from '../src/config'
import report from '../src/report'
import { Event, Breadcrumb } from '@ohbug/types'
jest.mock('../src/report')

const apiKey = 'test_id'
const config = { apiKey }
const platform = 'browser'
const event = {
  type: 'test'
} as Event<any>
const breadcrumb = { type: 'a' } as Breadcrumb

describe('core hub', () => {
  beforeAll(() => {
    init({
      config,
      platform,
      version: 'test',
      handleCapture: () => {},
      handleReport: () => {},
      handleAsync: () => {}
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

  it('hub.getBreadcrumbs() should return breadcrumbs', () => {
    const hub = getHub()

    // @ts-ignore
    expect(hub.getBreadcrumbs()).toEqual(hub.breadcrumbs)
  })

  it('hub.addBreadcrumbs() should return breadcrumbs', () => {
    const hub = getHub()

    hub.addBreadcrumb(breadcrumb)

    // @ts-ignore
    expect(hub.getBreadcrumbs()).toEqual([breadcrumb])
  })
})
