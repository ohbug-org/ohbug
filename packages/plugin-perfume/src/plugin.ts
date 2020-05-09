import Perfume from 'perfume.js'
import type { OhbugPlugin, OhbugCaptureCtx } from '@ohbug/types'

class Plugin implements OhbugPlugin {
  capture({ collect }: OhbugCaptureCtx) {
    new Perfume({
      resourceTiming: true,
      dataConsumption: true,
      logging: process.env.NODE_ENV === 'development',
      maxMeasureTime: 10000,
      analyticsTracker: (options) => {
        const { metricName, data } = options
        const event = { category: 'performance', type: metricName, data }
        collect(event, 'async')
      },
    })
  }
}

export default Plugin
