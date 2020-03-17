import { getGlobal } from '../src/get'
import { config, logger } from '../src/logger'

describe('utils logger', () => {
  const global = getGlobal<Window>()

  const content = 'hello'
  it('calls logger.log with `content`', () => {
    const logSpy = jest.spyOn(global.console, 'log')

    logger.log(content)

    expect(logSpy).toHaveBeenCalledWith(config.log.type, config.log.styles, content)
  })

  it('calls logger.error with `content`', () => {
    const errorSpy = jest.spyOn(global.console, 'error')

    logger.error(content)

    expect(errorSpy).toHaveBeenCalledWith(config.error.type, config.error.styles, content)
  })

  it('calls logger.info with `content`', () => {
    const infoSpy = jest.spyOn(global.console, 'info')

    logger.info(content)

    expect(infoSpy).toHaveBeenCalledWith(config.info.type, config.info.styles, content)
  })
})
