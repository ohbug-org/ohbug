import { logger } from '../src/logger'

describe('@ohbug/utils/logger', () => {
  const prefix = 'Ohbug'
  const content = 'hello'
  test('calls logger.log with `content`', () => {
    const logSpy = jest.spyOn(console, 'log')

    logger.log(content)

    expect(logSpy).toHaveBeenCalledWith(prefix, content)
  })

  test('calls logger.error with `content`', () => {
    const errorSpy = jest.spyOn(console, 'error')

    logger.error(content)

    expect(errorSpy).toHaveBeenCalledWith(prefix, content)
  })

  test('calls logger.info with `content`', () => {
    const infoSpy = jest.spyOn(console, 'info')

    logger.info(content)

    expect(infoSpy).toHaveBeenCalledWith(prefix, content)
  })
})
