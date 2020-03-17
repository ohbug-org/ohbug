import { getGlobal } from './get'

const global = getGlobal<Window>()

export const config = {
  log: {
    type: `%c log`,
    styles: `color: #4CAF50; font-weight: bold`
  },
  error: {
    type: `%c error`,
    styles: `color: #F20404; font-weight: bold`
  },
  info: {
    type: `%c info`,
    styles: `color: #03A9F4; font-weight: bold`
  }
}

export class logger {
  public static log(...args: any[]) {
    global.console.log(config.log.type, config.log.styles, ...args)
  }

  public static error(...args: any[]) {
    global.console.error(config.error.type, config.error.styles, ...args)
  }

  public static info(...args: any[]) {
    global.console.info(config.info.type, config.info.styles, ...args)
  }
}
