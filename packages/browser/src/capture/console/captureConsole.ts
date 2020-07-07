import { replace } from '@ohbug/utils'
import { getHub } from '@ohbug/core'

type Level = 'log' | 'info' | 'warn' | 'error'
const levels: Level[] = ['log', 'info', 'warn', 'error']
const consoleOriginal = Object.keys(levels).reduce<Record<Level, any>>(
  (acc, cur: Level) => ({
    ...acc,
    [cur]: console[cur],
  }),
  {
    log: null,
    info: null,
    warn: null,
    error: null,
  }
)

function captureConsole() {
  const hub = getHub<Window>()

  levels.forEach((level) => {
    consoleOriginal[level] = replace(
      console,
      level,
      (origin) =>
        function (...args: any[]) {
          const isOhbugConsole = args.some(
            (arg) => typeof arg === 'string' && arg.includes('Ohbug')
          )
          if (!isOhbugConsole) {
            const timestamp = new Date().toISOString()
            hub.addAction({
              type: 'console',
              timestamp,
              message: level,
              data: args,
            })
          }

          return origin.apply(this, args)
        }
    )
  })
}

export function removeCaptureConsole() {
  if (console) {
    levels.forEach((level) => {
      console[level] = consoleOriginal[level]
    })
  }
}

export default captureConsole
