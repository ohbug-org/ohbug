import { defineExtension } from '@ohbug/core'

import { handleCapture } from './capture'
import { handleDestroy } from './destroy'

export const extension = defineExtension({
  name: 'OhbugBrowser',
  onSetup: () => {
    handleCapture()
    handleDestroy()
  },
})
