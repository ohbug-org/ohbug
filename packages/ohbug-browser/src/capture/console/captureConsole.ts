/* eslint-disable no-console */

import { getOhbugObject, replace } from '@ohbug/utils'

type Level = 'log' | 'info' | 'warn' | 'error'
const levels: Level[] = ['log', 'info', 'warn', 'error']
const consoleOriginal = Object.keys(levels).reduce<Record<Level, any>>(
  (acc, cur: string) => ({
    ...acc,
    // @ts-expect-error 修改了原生的console
    [cur]: console[cur],
  }),
  {
    log: null,
    info: null,
    warn: null,
    error: null,
  },
)

export function captureConsole() {
  const { client } = getOhbugObject<Window>()
  levels.forEach((level) => {
    consoleOriginal[level] = replace(
      console,
      level,
      origin =>
        function call(...args: any[]) {
          const isOhbugConsole = args.some(arg => typeof arg === 'string' && arg.includes('Ohbug'))
          if (!isOhbugConsole) { client.addAction(`console.${level}`, args, 'console') }

          return origin.apply(this, args)
        },
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
