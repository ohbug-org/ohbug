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

  it('should throw error', () => {
    expect(() => {
      warning(false, 'message')
    }).toThrow(/message/)
  })
})
