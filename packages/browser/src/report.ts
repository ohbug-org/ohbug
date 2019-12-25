import { Event } from '@ohbug/core'

// Environment variable
// @ts-ignore
const base_url = BASE_URL

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
