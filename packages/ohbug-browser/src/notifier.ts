import type { OhbugEventWithMethods } from '@ohbug/types'

import { getOhbugObject } from '@ohbug/utils'

const getCircularReplacer = () => {
  const seen = new WeakSet()
  return (_: any, value: any) => {
    if (typeof value === 'object' && value !== null) {
      if (seen.has(value)) { return }

      seen.add(value)
    }
    return value
  }
}

export function notifier<D>(event: OhbugEventWithMethods<D>) {
  const { client } = getOhbugObject<Window>()
  const url = client.__config.endpoint!

  return new Promise((resolve, reject) => {
    const json = JSON.stringify(event, getCircularReplacer())
    if (navigator.sendBeacon) {
      const result = navigator.sendBeacon(url, json)
      resolve(result)
    }
    else {
      const xhr = new XMLHttpRequest()
      xhr.onreadystatechange = () => {
        if (xhr.readyState === XMLHttpRequest.DONE) {
          if (xhr.status >= 200 && xhr.status < 300) { return resolve(xhr.response) }
          reject(xhr)
        }
      }
      xhr.open('POST', url)
      xhr.setRequestHeader('Content-Type', 'application/json;charset=UTF-8')
      xhr.send(json)
    }
  })
}
