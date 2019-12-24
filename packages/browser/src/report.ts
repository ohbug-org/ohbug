import { Event } from '@ohbug/core'

// Environment variable
// @ts-ignore
const base_url = BASE_URL

function report(events: Event<any>[]) {
  const url = `${base_url}`
  const json = JSON.stringify(events)

  if (navigator.sendBeacon) {
    navigator.sendBeacon(url, json)
  } else {
    const img = new Image()
    img.src = `${url}?events=${json}`
  }
}

export default report
