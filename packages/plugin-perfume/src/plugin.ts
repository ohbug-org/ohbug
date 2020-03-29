import { Capture, Plugin } from '@ohbug/types'
import Perfume from 'perfume.js'

const capture: Capture = ({ collect }) => {
  new Perfume({
    resourceTiming: true,
    dataConsumption: true,
    logging: process.env.NODE_ENV === 'development',
    maxMeasureTime: 10000,
    analyticsTracker: options => {
      const { metricName, data, duration } = options
      switch (metricName) {
        case 'navigationTiming':
          if (data && data.timeToFirstByte) {
            collect({ type: metricName, data: data }, 'async')
          }
          break
        case 'networkInformation':
          if (data && data.effectiveType) {
            collect({ type: metricName, data: data }, 'async')
          }
          break
        case 'resourceTiming':
          collect({ type: metricName, data: data }, 'async')
          break
        case 'dataConsumption':
          collect({ type: metricName, data: data }, 'async')
          break
        case 'firstPaint':
          collect({ type: metricName, data: duration }, 'async')
          break
        case 'firstContentfulPaint':
          collect({ type: metricName, data: duration }, 'async')
          break
        case 'firstInputDelay':
          collect({ type: metricName, data: duration }, 'async')
          break
        case 'largestContentfulPaint':
          collect({ type: metricName, data: duration }, 'async')
          break
        default:
          break
      }
    }
  })
}

const plugin: Plugin = () => ({
  capture
})

export default plugin
