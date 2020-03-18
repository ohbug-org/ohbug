import { warning } from '../src/warning'

describe('utils warning', () => {
  it('should throw error that not passed format message', () => {
    expect(() => {
      // @ts-ignore
      warning(true)
    }).toThrow(/requires a warning message argument/)
  })

  it('should not throw error', () => {
    expect(() => {
      warning(true, 'message')
    }).not.toThrow()
  })

  it('should log message', () => {
    const errorSpy = jest.spyOn(global.console, 'error')
    const message = 'test message'
    warning(false, message)
    expect(errorSpy.mock.calls[0][2]).toBe(message)
  })
})
