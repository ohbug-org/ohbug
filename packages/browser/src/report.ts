import type { OhbugEvent } from '@ohbug/types'

function report<T>(event: OhbugEvent<T>) {
  const url = `__URL_REPORT__`
  return new Promise((resolve, reject) => {
    const json = JSON.stringify(event)
    if (navigator.sendBeacon) {
      const result = navigator.sendBeacon(url, json)
      resolve(result)
    } else {
      const xhr = new XMLHttpRequest()
      xhr.onreadystatechange = () => {
        if (xhr.readyState === XMLHttpRequest.DONE) {
          if (xhr.status >= 200 && xhr.status < 300) return resolve(xhr.response)
          reject(xhr)
        }
      }
      xhr.open('POST', url)
      xhr.setRequestHeader('Content-Type', 'application/json;charset=UTF-8')
      xhr.send(json)
    }
  })
}

export default report
