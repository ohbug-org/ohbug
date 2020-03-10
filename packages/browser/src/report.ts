import { Event } from '@ohbug/types'

const base_url = `http://api.ohbug.io/v1/report`

function report<T>(event: Event<T>) {
  const url = `${base_url}`
  const json = JSON.stringify(event)

  if (navigator.sendBeacon) {
    navigator.sendBeacon(url, json)
  } else {
    const img = new Image()
    img.src = `${url}?event=${json}`
  }
}

export default report
