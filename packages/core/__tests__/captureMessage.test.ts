import captureMessage from '../src/captureMessage'
import createEvent from '../src/createEvent'
import collect from '../src/collect'
jest.mock('../src/createEvent')
jest.mock('../src/collect')

const mockCreateEvent = jest.fn()
;(createEvent as jest.Mock).mockImplementation((...args) => {
  mockCreateEvent(...args)
})
const mockCollect = jest.fn()
;(collect as jest.Mock).mockImplementation((...args) => {
  mockCollect(...args)
})
const message = 'hello'

describe('core captureMessage', () => {
  it('calls captureMessage()', () => {
    captureMessage(message)
    expect(mockCreateEvent.mock.calls[0]).toEqual(['message', { message }, 'message'])
    expect(mockCollect).toBeCalled()
  })
})
