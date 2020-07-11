import { logger } from '../src/logger'

describe('utils logger', () => {
  const content = 'hello'
  it('calls logger.log with `content`', () => {
    const logSpy = jest.spyOn(console, 'log')

    logger.log(content)

    expect(logSpy).toHaveBeenCalledWith(content)
  })

  it('calls logger.error with `content`', () => {
    const errorSpy = jest.spyOn(console, 'error')

    logger.error(content)

    expect(errorSpy).toHaveBeenCalledWith(content)
  })

  it('calls logger.info with `content`', () => {
    const infoSpy = jest.spyOn(console, 'info')

    logger.info(content)

    expect(infoSpy).toHaveBeenCalledWith(content)
  })
})
