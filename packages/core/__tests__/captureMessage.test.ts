import captureMessage from '../src/captureMessage'
import createEvent from '../src/createEvent'
import collector from '../src/collector'
jest.mock('../src/createEvent')
jest.mock('../src/collector')

const mockCreateEvent = jest.fn()
;(createEvent as jest.Mock).mockImplementation((...args) => {
  mockCreateEvent(...args)
})
const mockCollector = jest.fn()
;(collector as jest.Mock).mockImplementation((...args) => {
  mockCollector(...args)
})
const message = 'hello'

describe('core captureMessage', () => {
  it('calls captureMessage()', () => {
    captureMessage(message)
    expect(mockCreateEvent.mock.calls[0]).toEqual(['message', { message }, 'message'])
    expect(mockCollector).toBeCalled()
  })
})
