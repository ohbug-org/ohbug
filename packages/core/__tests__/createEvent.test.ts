import init from '../src/init'
import createEvent, { createOtherEvent } from '../src/createEvent'

const apiKey = 'test_id'
const config = { apiKey }
const platform = 'browser'
const type = 'test'
const detail = {
  a: 1
}

describe('core createEvent', () => {
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

  it('createEvent(): should return the correct event format', () => {
    const event = createEvent(type, detail)
    expect(event.apiKey).toBe(apiKey)
    expect(event.category).toBe('error')
    expect(event.type).toBe(type)
    expect(event.tags instanceof Object).toBe(true)
    expect(Array.isArray(event.breadcrumbs)).toBe(true)
    expect(event.detail).toEqual(detail)
  })

  it('createOtherEvent(): should return the correct event format', () => {
    const event = createOtherEvent(type, detail)
    expect(event.apiKey).toBe(apiKey)
    expect(event.category).toBe('other')
    expect(event.type).toBe(type)
    expect(event.tags instanceof Object).toBe(true)
    expect(Array.isArray(event.breadcrumbs)).toBe(true)
    expect(event.detail).toEqual(detail)
  })
})
