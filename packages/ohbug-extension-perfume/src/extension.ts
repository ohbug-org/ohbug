import { createExtension } from '@ohbug/core'
import Perfume from 'perfume.js'

export const extension = createExtension({
  name: 'OhbugExtensionPerfume',
  init: (client) => {
    new Perfume({
      resourceTiming: true,
      analyticsTracker: (options) => {
        const { metricName, data } = options
        const event = client.createEvent({
          category: 'performance',
          type: metricName,
          detail: data,
        })
        client.notify(event)
      },
    })
  },
})
