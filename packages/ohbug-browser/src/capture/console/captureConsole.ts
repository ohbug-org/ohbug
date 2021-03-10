/* eslint-disable no-console */
import { replace, getOhbugObject } from '@ohbug/utils'

type Level = 'log' | 'info' | 'warn' | 'error'
const levels: Level[] = ['log', 'info', 'warn', 'error']
const consoleOriginal = Object.keys(levels).reduce<Record<Level, any>>(
  (acc, cur: string) => ({
    ...acc,
    // @ts-ignore
    [cur]: console[cur],
  }),
  {
    log: null,
    info: null,
    warn: null,
    error: null,
  }
)

export function captureConsole() {
  const { client } = getOhbugObject<Window>()
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
            client.addAction(`console.${level}`, args, 'console')
          }
          // @ts-ignore
          return origin.apply(this, args)
        }
    )
  })
}

export function removeCaptureConsole() {
  if (console) {
    levels.forEach((level) => {
      // @ts-ignore
      console[level] = consoleOriginal[level]
    })
  }
}
