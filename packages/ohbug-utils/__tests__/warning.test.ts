import { warning } from '../src/warning'
import { logger } from '../src/logger'

describe('@ohbug/utils/warning', () => {
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
    const errorSpy = jest.spyOn(logger, 'warn')
    const message = 'test message'
    warning(false, message)
    expect(errorSpy.mock.calls[0][0]).toBe(message)
  })
})
