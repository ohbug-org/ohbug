import { getGlobal, Queue } from '@ohbug/utils'
import { getOhbugObject, createEvent } from '@ohbug/core'

/**
 * async event flow
 * 1. Registering asynchronous events
 * 2. Push event into the queue
 * 3. Report all events in the queue when an asynchronous event is triggered
 * 4. Clear queue
 */
function async() {
  const global = getGlobal<Window>()
  const ohbugObject = getOhbugObject<Window>()
  const queue = new Queue()
  ohbugObject._asyncQueue = queue

  if (global.addEventListener) {
    global.addEventListener('unload', () => {
      // report
      const event = createEvent('PERFUME', queue.get(), 'other')
      ohbugObject._report && ohbugObject._report(event, 'async')
      queue.clear()
    })
  }
}

export default async
