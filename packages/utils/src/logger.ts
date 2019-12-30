import { getGlobal } from './get'

const global = getGlobal<Window>()

export class logger {
  static log(...args: any[]) {
    global.console.log(`%c log`, `color: #4CAF50; font-weight: bold`, ...args)
  }
  static error(...args: any[]) {
    global.console.error(`%c error`, `color: #F20404; font-weight: bold`, ...args)
  }
  static info(...args: any[]) {
    global.console.info(`%c info`, `color: #03A9F4; font-weight: bold`, ...args)
  }
  static group(title: string) {
    global.console.group(`%c ${title}`, `color: gray; font-weight: lighter`)
  }
  static groupEnd() {
    global.console.groupEnd()
  }
}
