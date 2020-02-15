import { PluginCapturerContext } from '@ohbug/core'
import Nemetric from 'nemetric'

function capturer({ collector }: PluginCapturerContext) {
  new Nemetric({
    // https://github.com/WarrenJones/nemetric#navigation-timing
    navigationTiming: true,
    // https://github.com/WarrenJones/nemetric#resource-timing
    dataConsumption: true,
    // https://github.com/WarrenJones/nemetric#networkinformation
    networkInformation: true,
    // https://github.com/WarrenJones/nemetric#%E9%A6%96%E6%AC%A1%E7%BB%98%E5%88%B6-fp
    firstPaint: true,
    // https://github.com/WarrenJones/nemetric#%E9%A6%96%E6%AC%A1%E5%86%85%E5%AE%B9%E7%BB%98%E5%88%B6-fcp
    firstContentfulPaint: true,
    // https://github.com/WarrenJones/nemetric#%E9%A6%96%E6%AC%A1%E8%BE%93%E5%85%A5%E5%BB%B6%E8%BF%9F-fid
    firstInputDelay: true,
    // https://github.com/WarrenJones/nemetric#%E9%A6%96%E6%AC%A1%E8%BE%93%E5%85%A5%E5%BB%B6%E8%BF%9F-fid
    largestContentfulPaint: true,
    logging: process.env.NODE_ENV === 'development',
    logPrefix: 'ohbug-nemetric:',
    analyticsTracker: data => {
      collector(data, 'async')
    }
  })
}

function plugin() {
  return {
    capturer
  }
}

export default plugin
