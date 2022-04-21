import { describe, expect, test, vi } from 'vitest'
import { warning } from '../src/warning'
import { logger } from '../src/logger'

describe('@ohbug/utils/warning', () => {
  test('should not throw error', () => {
    expect(() => {
      warning(true, 'message')
    }).not.toThrow()
  })

  test('should log message', () => {
    const errorSpy = vi.spyOn(logger, 'warn')
    const message = 'test message'
    warning(false, message)
    expect(errorSpy.mock.calls[0][0]).toBe(message)
  })
})
