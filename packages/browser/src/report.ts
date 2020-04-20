import type { OhbugEvent } from '@ohbug/types'

const url = `__URL_REPORT__`

function report<T>(event: OhbugEvent<T>) {
  const json = JSON.stringify(event)

  if (navigator.sendBeacon) {
    navigator.sendBeacon(url, json)
  } else {
    const img = new Image()
    img.src = `${url}?event=${json}`
  }
}

export default report
