import { createExtension } from '@ohbug/core'
import { record } from 'rrweb'
import { eventWithTime } from 'rrweb/typings/types'

const eventsMatrix: eventWithTime[][] = [[]]
export const extension = createExtension({
  name: 'OhbugExtensionRrweb',
  init: () => {
    record({
      emit(event, isCheckout) {
        if (isCheckout) {
          eventsMatrix.push([])
        }
        const lastEvents = eventsMatrix[eventsMatrix.length - 1]
        lastEvents.push(event)
      },
      checkoutEveryNms: 3 * 60 * 1000,
    })
  },
  created: (event) => {
    const len = eventsMatrix.length
    const events = (eventsMatrix[len - 2] || []).concat(eventsMatrix[len - 1])
    event.addMetaData('rrweb', events)
    return event
  },
})
