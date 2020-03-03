import { Event } from '@ohbug/core'

const base_url = `http://localhost:3001/v1/report`

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
